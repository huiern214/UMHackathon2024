from langchain_community.utilities.sql_database import SQLDatabase

def calculate_expenses_for_month(transaction_table_id, month):

    year = 2024

    start_date = f'{year}-{month:02d}-01'
    end_date = f'{year}-{month:02d}-31'  # Assuming 31 days for simplicity

    query = f"""
    SELECT "category", SUM("withdrawalAmt") AS total_expense
    FROM "Transactions"
    WHERE "transactionTableID" = {transaction_table_id}
        AND "withdrawalAmt" > 0 
        AND date >= '{start_date}' AND date <= '{end_date}'     
    GROUP BY "category"
    """

    db_uri = f"sqlite:///chatbot/service/data/database.sqlite3"
    db = SQLDatabase.from_uri(db_uri)
    data = db._execute(query)
    print(data)

    # convert data to dict
    data = {row['category']: row['total_expense'] for row in data}
    # sort and get top 5
    top_categories = sorted(data, key=data.get, reverse=True)[:5]
    top_expenses = [data[category] for category in top_categories]
    
    return dict(zip(top_categories, top_expenses))
