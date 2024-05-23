from langchain_community.utilities.sql_database import SQLDatabase

def calculate_total_expenses_earnings(transaction_table_id, month):
    year = 2024
    start_date = f'{year}-{month:02d}-01'
    end_date = f'{year}-{month:02d}-31'  # Assuming 31 days for simplicity

    query_expenses = f"""
    SELECT SUM("withdrawalAmt") AS total_expense
    FROM "Transactions"
    WHERE "transactionTableID" = {transaction_table_id}
        AND "withdrawalAmt" > 0
        AND date >= '{start_date}' AND date <= '{end_date}'
    """
    
    query_earnings = f"""
    SELECT SUM("depositAmt") AS total_earning
    FROM "Transactions"
    WHERE "transactionTableID" = {transaction_table_id}
        AND "depositAmt" > 0
        AND date >= '{start_date}' AND date <= '{end_date}'
    """

    db_uri = f"sqlite:///chatbot/service/data/database.sqlite3"
    db = SQLDatabase.from_uri(db_uri)
    response_expenses = db._execute(query_expenses)
    # print(response_expenses)
    response_earnings = db._execute(query_earnings)
    # print(response_earnings)

    result = {
        "total_expense": response_expenses[0]['total_expense'],
        "total_earning": response_earnings[0]['total_earning']
    }

    return result
    # return total_expenses, total_earnings
