from langchain_community.utilities.sql_database import SQLDatabase

def calculate_sum_by_payment_method(transaction_table_id, month):

    year = 2024
    start_date = f'{year}-{month:02d}-01'
    end_date = f'{year}-{month:02d}-31'  # Assuming 31 days for simplicity

    query = f"""
    SELECT "paymentMethod", SUM("withdrawalAmt") AS total_expense
    FROM "Transactions"
    WHERE "transactionTableID" = {transaction_table_id}
        AND "withdrawalAmt" > 0
        AND date >= '{start_date}' AND date <= '{end_date}'     
    GROUP BY "paymentMethod"
    """
    
    db_uri = f"sqlite:///chatbot/service/data/database.sqlite3"
    db = SQLDatabase.from_uri(db_uri)
    data = db._execute(query)
    print(data)
    
    #  convert data to dict
    data = {row['paymentMethod']: row['total_expense'] for row in data}
    
    # # {
    #     "Bank transfer": 10464.82,
    #     "Card payment": 6306.0,
    #     "Cash": 15112.0,
    #     "Cheque": 6933.58,
    #     "Credit card": 7442.0,
    #     "Debit Card": 80.0,
    #     "Direct debit": 33663.0,
    #     "Online banking": 23573.0,
    #     "Online payment": 18980.56,
    #     "Online payment ": 2693.0,
    #     "Others": 14336.1
    # }
    
    # clean data with white space and combine if payment method is the same
    for key in list(data.keys()):
        if key is None or key == "":
            data["Others"] = data.pop(key)
        elif key.strip() != key:
            if key.strip() in data:
                data[key.strip()] += data.pop(key)    
    
    return data

# calculate_sum_by_payment_method(1, 1)