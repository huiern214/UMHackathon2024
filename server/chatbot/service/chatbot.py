import re
from datetime import datetime
from langchain_community.utilities.sql_database import SQLDatabase
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI
import firebase_admin
from firebase_admin import credentials, firestore
from .config import OPENAI_API_KEY
from google.cloud.firestore_v1.base_query import FieldFilter

cred = credentials.Certificate("./chatbot/service/firebase_key.json")
firebase_admin.initialize_app(cred)
firestore_client = firestore.client()
db_uri = f"sqlite:///chatbot/service/data/database.sqlite3"
db = SQLDatabase.from_uri(db_uri)
API_KEY = OPENAI_API_KEY


def create_new_chat(userId: int = 1, tableId: int = 1, chatName: str = "New Chat"):
    """Add a new chat document to the "chats" collection and return the document ID"""
    query_collection = firestore_client.collection("chats")
    query_document = query_collection.add({
        "userId": userId,
        "tableId": tableId,
        "chatName": chatName,
        "history": []
    })
    query_id = query_document[1].id
    return query_id


def get_search_results(userPrompt: str, tableId: int = 1):
    # Get the schema
    schema = db.get_table_info()
    search_results = ""
    search_results += f"Schema: {schema}\n"

    # Get column names
    query = "SELECT * FROM Transactions LIMIT 1;"
    column_names = db._execute(query)[0].keys()

    table_info = ""
    table_dict = {}
    for column in column_names:
        if column == "transactionID" or column == "transactionTableID" or column == "withdrawalAmt" or column == "depositAmt":
            continue
        table_info += f"{column}: "
        query = f"SELECT DISTINCT {column} FROM Transactions WHERE transactionTableID = {tableId};"
        results = db._execute(query)
        table_info += ", ".join([str(result.get(column))
                                for result in results])
        table_info += "\n"

        table_dict[column] = [str(result.get(column)) for result in results]

    # Search user prompt words in the 'Transactions'
    words = re.findall(r'\w+', userPrompt)

    # dict key with list
    search_dict = {key: [] for key in table_dict.keys()}
    search_dict["date"] = table_dict.get("date")
    for word in words:
        for key in table_dict.keys():
            if key == "date":
                continue
            for item in table_dict.get(key):
                # if item contains the word
                if word.lower() in item.lower():
                    search_dict.get(key).append(item)
    search_results += "\nUser Prompt: " + userPrompt + "\n" + "Search Results for each column:\n" + \
        "[column name: list of similar word search results from database]\n"

    for key in search_dict.keys():
        search_results += f"{key}: "
        search_results += ", ".join(search_dict.get(key))
        search_results += "\n"
    return search_results


def get_sql_chain():
    template = """
    {search_results}
    \n\nYou are a data analyst that provides personalized questions and answers about personal finance. You are interacting with a user who is asking you questions about the personal transaction database.
    Based on the table schema and similar word search results above, write a SQL query for 'Transactions' Table that would answer the user's question given that the TransactionTableID = {tableId}. Take the conversation history into account.

    Conversation History: {chat_history}
    
    Write only the SQL query and nothing else. Do not wrap the SQL query in any other text, not even backticks.
    
    For example (trasactionTableID = 1):  
    Question: What is my coffee salary spending for the last 1 year?
    SQL Query: SELECT SUM(withdrawalAmt) AS coffee_spending FROM Transactions WHERE description = 'Expenses for coffee and snacks' AND date >= DATE('now', '-365 days') AND transactionTableID = 1;
    Question: List the top 5 categories with the highest spending
    SQL Query: SELECT category, SUM(withdrawalAmt) AS total_spending FROM Transactions WHERE transactionTableID = 1 GROUP BY category ORDER BY total_spending DESC LIMIT 5;
    
    Your turn:
    
    Question: {question}
    SQL Query:
    """
    prompt = ChatPromptTemplate.from_template(template)
    # llm = ChatGoogleGenerativeAI(model="gemini-pro")
    # llm = ChatGroq(temperature=0, model_name="mixtral-8x7b-32768")
    llm = ChatOpenAI(model_name="gpt-3.5-turbo",
                     openai_api_key=API_KEY)

    return (
        prompt |
        llm |
        StrOutputParser()
    )


def print_get_Sql_chain(userPrompt, chat_history, tableId):
    question = userPrompt
    search_results = get_search_results(userPrompt, tableId)
    sql_chain = get_sql_chain()

    # Capture the generated SQL query
    sql_query = sql_chain.invoke(
        {"question": question, "chat_history": chat_history, "tableId": tableId, "search_results": search_results})

    # Now you can use the sql_query string for further processing, like executing it on your database.
    print(f"Generated SQL Query: {sql_query}")
    # use the sql to execute on the database
    # transactionData = db._execute(sql_query)
    # do exception handling for the sql query
    transactionData = []
    try:
        transactionData = db._execute(sql_query)
    except Exception as e:
        print(f"Error: {e}")
    # print(f"Transaction Data: {transactionData}")
    
    return transactionData


def get_response(user_query: str = "", userId: int = None, tableId: str = "", chatId: str = ""):
    # llm = ChatGoogleGenerativeAI(model="gemini-pro")
    llm = ChatOpenAI(model_name="gpt-3.5-turbo",
                     openai_api_key=API_KEY)
    
    # If chatId not found, create a new chat
    if chatId == "" or chatId is None or not firestore_client.collection("chats").document(chatId).get().exists:
        # llm generate chatname based on user_query
        chatName = "New Chat"
        new_chat_messages = [
            SystemMessage(content="""Create a new chat session name based on user query.
                          Example
                            Question: What is my total coffee spending?
                            Bot response: Coffee Spending
                            
                            Your turn:
                            
                            Question: {user_query}
                            Bot response: 
                            *Do not include the word 'Chat Name:' in the response. Just provide the generated chat name.
                          """), 
            HumanMessage(content=user_query)]
        llm_response = llm.invoke(new_chat_messages)
        chatName = llm_response.content
        # print(chatName)
        chatId = create_new_chat(userId, tableId, chatName)
    
    queryDocumentRef = firestore_client.collection("chats").document(chatId)
    queryDocument = queryDocumentRef.get().to_dict()
    messages = queryDocument.get("history", [])
    userId = queryDocument.get("userId")
    tableId = queryDocument.get("tableId")

    # Append user message to messages list
    chat_history = []

    for message in messages:
        if message.get("author") == "user":
            chat_history.append(HumanMessage(content=message.get("content")))
        elif message.get("author") == "bot":
            chat_history.append(AIMessage(content=message.get("content")))

    messages.append({"author": "user", "content": user_query,
                    "timestamp": datetime.now()})
    chat_history.append(HumanMessage(content=user_query))

    sql_chain = get_sql_chain()

    template = """
    You are a data analyst that provides personalized questions and answers about personal finance. You are interacting with a user who is asking you questions about the personal transaction database.
    Based on the table schema below, question, sql query, and sql response, write a natural language response. Avoid repeating the same information in the question and response. Avoid mentioning the transactionTableID and 'Based on the query you provided' in the response.
    If the user asks for a list of transactions, list all with limit 10. If user ask more than that, we will provide transaction data in csv later.
    <SCHEMA>{schema}</SCHEMA>

    Conversation History: {chat_history}
    SQL Query: <SQL>{query}</SQL>
    User question: {question}
    SQL Response: {response}"""

    prompt = ChatPromptTemplate.from_template(template)

    chain = (
        RunnablePassthrough.assign(query=sql_chain).assign(
            schema=lambda _: db.get_table_info(),
            response=lambda vars: db.run(vars["query"]),
        )
        | prompt
        | llm
        | StrOutputParser()
    )

    # print the generated SQL query
    transactionData = print_get_Sql_chain(user_query, chat_history, tableId)

    bot_response = chain.invoke({
        "chat_history": chat_history,
        "question": user_query,
        "tableId": tableId,
        "search_results": get_search_results(user_query, tableId)
    })

    # Append bot message to messages list
    chat_history.append(AIMessage(content=bot_response))
    messages.append({"author": "bot", "content": bot_response,
                    "timestamp": datetime.now()})

    if bot_response:
        queryDocumentRef.update({
            "history": messages
        })
        
    result = {
        "response": bot_response,
        "chatId": chatId,
        "transactionData": transactionData
    }
    
    return result


def retrieve_chat_history(chatId: str):
    queryDocumentRef = firestore_client.collection("chats").document(chatId)
    queryDocument = queryDocumentRef.get().to_dict()
    messages = queryDocument.get("history", [])
    return messages


def retrieve_chats_by_tableId(tableId: int):
    query = firestore_client.collection("chats").where(filter=FieldFilter("tableId", "==", tableId))
    # query = firestore_client.collection("chats").where("tableId", "==", tableId)
    queryDocument = query.stream()
    chats = []
    for document in queryDocument:
        # get chat id and chat name
        chat = document.to_dict()
        chats.append({"chatId": document.id, "chatName": chat.get("chatName")})
    return chats

def retrieve_all_tables(userId: int = 1):
    db = SQLDatabase.from_uri(db_uri)
    query = f"SELECT transactionTableID AS tableID, transactionTableName AS tableName FROM TransactionTables WHERE userID = {userId};"
    tables = []
    try:
        tables = db._execute(query)
        print("Tables: ", tables)
    except Exception as e:
        print(f"Error: {e}")
    return tables


# chatId = create_new_chat(1, 3)
# chatId = "G29z15gR7MvP3FVlBni8"  # chatId for user 1 and table 1
# chatId = "qwGFGMOFHpDDkhGgvFwO"  # chatId for user 1 and table 3

# Question for table 1
# question = "What is my total coffee spending?"
# question = "How much is my total salary for the last 5 months?"
# question = "Can you list all the transactions for my monthly salary?"
# question = "What is my total income?"
# question = "What will be my spending like for next month? Provide me reasons for the spending."

# Question for table 3
# question = "May I know the total rent payments I earn?"
# print(get_response(question, chatId))
# print(get_response(question, 1, 1))