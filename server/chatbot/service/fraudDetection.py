import pandas as pd
import numpy as np
import json
from langchain_community.utilities.sql_database import SQLDatabase

def fraud_detection(tableId: int = 1):
    # Read data from Excel file
    # df = pd.read_excel('./chatbot/service/out.xlsx')
    
    db_uri = f"sqlite:///chatbot/service/data/database.sqlite3"
    db = SQLDatabase.from_uri(db_uri)
    query = f"SELECT * FROM transactions WHERE transactionTableID = {tableId}"
    list_result = db._execute(query)
    # print(list_result)
    
    # convert list of tuples to pandas dataframe
    df = pd.DataFrame(list_result, columns=['transactionTableID', 'transactionID', 'date', 'transactionDetails', 'description', 'category', 'paymentMethod', 'withdrawalAmt', 'depositAmt'])
    # print(df)
    # Filter data for transactions with 'transactionTableID' equal to 1
    # df = df[df['transactionTableID'] == tableId]

    # Group by 'category' and calculate quartiles for withdrawal amounts for each category
    quartiles = df.groupby('category')['withdrawalAmt'].quantile([0.25, 0.75]).unstack()
    
    # Calculate interquartile range (IQR) for each category
    quartiles['IQR'] = quartiles[0.75] - quartiles[0.25]

    # Define lower and upper limits for outliers
    quartiles['lower_limit'] = quartiles[0.25] - 1.5 * quartiles['IQR']
    quartiles['upper_limit'] = quartiles[0.75] + 1.5 * quartiles['IQR']

    # Initialize a dictionary to store the count of suspicious transactions for each category
    suspicious_transactions = {}

    # Iterate over each row in the DataFrame to identify suspicious transactions
    for index, row in df.iterrows():
        category = row['category']
        withdrawal_amt = row['withdrawalAmt']
        lower_limit = quartiles.loc[category, 'lower_limit']
        upper_limit = quartiles.loc[category, 'upper_limit']

        if withdrawal_amt < lower_limit or withdrawal_amt > upper_limit:
            # Increment the count of suspicious transactions for this category
            suspicious_transactions[category] = suspicious_transactions.get(category, 0) + 1

    # Print the count of suspicious transactions for each category
    for category, count in suspicious_transactions.items():
        print(f"Category {category}: {count} suspicious transactions")

    # FOR LLM FEED IN #
    suspicious_transactions_basicoutput = [{'Category': category, 'Suspicious Transactions': count} 
                                    for category, count in suspicious_transactions.items()]

    # print(suspicious_transactions_basicoutput) # return response
    text_response = ""
    for i in suspicious_transactions_basicoutput:
        text_response += f"Category {i['Category']}: {i['Suspicious Transactions']} suspicious transactions\n"
    

    # Initialize a dictionary to store DataFrames of suspicious transactions for each category
    suspicious_transactions_by_category = {}

    # Iterate over each row in the DataFrame to store suspicious transactions for each category
    for index, row in df.iterrows():
        category = row['category']
        withdrawal_amt = row['withdrawalAmt']
        lower_limit = quartiles.loc[category, 'lower_limit']
        upper_limit = quartiles.loc[category, 'upper_limit']

        if withdrawal_amt < lower_limit or withdrawal_amt > upper_limit:
            # Store the entire row of the suspicious transaction in the DataFrame slice
            if category not in suspicious_transactions_by_category:
                suspicious_transactions_by_category[category] = pd.DataFrame(columns=df.columns)
            # suspicious_transactions_by_category[category] = suspicious_transactions_by_category[category].append(row, ignore_index=True)
            # df doesn't have append method, so we need to use concat
            suspicious_transactions_by_category[category] = pd.concat([suspicious_transactions_by_category[category], pd.DataFrame(row).T])

    # Prepare data for each category and store it in a list
    final_data = []

    # Iterate over each category and its corresponding DataFrame
    for transactions_df in suspicious_transactions_by_category.values():
        # Convert the DataFrame to a list of dictionaries and append it to final_data
        transactions_list = transactions_df.fillna("nan").to_dict(orient='records')
        final_data.extend(transactions_list)
    
    if text_response == "":
        text_response = "No suspicious transactions detected."
    else:
        text_response = "Suspicious transactions detected:\n" + text_response
    return text_response, final_data

    # # Write the final data to a JSON file
    # with open('suspicious_transactions.json', 'w') as file:
    #     json.dump(final_data, file, indent=4)

    # # Load the JSON file and print its contents
    # with open('suspicious_transactions.json', 'r') as file:
    #     data = json.load(file)

    # FOR EXPORT CHART FEATURE #