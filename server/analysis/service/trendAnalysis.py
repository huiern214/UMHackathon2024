from prophet import Prophet
import pandas as pd
from langchain_community.utilities.sql_database import SQLDatabase

# ds = ['2021-01-01', '2021-01-02', '2021-01-03', '2021-01-04', '2021-01-05']
# y = [100, 110, 105, 115, 120]
def predict_trend(ds, y):
    # n_years = 1
    # period = n_years * 365  # calculate number of days
    
    # 60 days
    period = 60

    # Predict forecast with Prophet
    df_train = pd.DataFrame({'ds': ds, 'y': y})
    print(df_train.head())
    # Train Prophet model
    m = Prophet()
    m.fit(df_train)

    # Make future predictions
    future = m.make_future_dataframe(periods=period)
    forecast = m.predict(future)

    # Return prediction result
    return forecast.to_dict(orient='records')

def get_all_expenses(tableId: int = 1):
    db_uri = f"sqlite:///chatbot/service/data/database.sqlite3"
    db = SQLDatabase.from_uri(db_uri)
    
    query = "SELECT date, withdrawalAmt FROM Transactions WHERE transactionTableID = " + str(tableId)
    result = db._execute(query)
    
    #  Initialize lists to store date and withdrawalAmt values
    dates = []
    withdrawal_amts = []
    
    # Iterate over the result and split it into date and withdrawalAmt
    for row in result:
        if row['withdrawalAmt'] is None:
            continue
        # same date, total withdrawal amt
        elif row['date'] in dates:
            withdrawal_amts[-1] += row['withdrawalAmt']
        else:
            dates.append(row['date'])
            withdrawal_amts.append(row['withdrawalAmt'])
        
        
    return dates, withdrawal_amts
        

# print(get_all_expenses(1))
# print(predict_stock_price(get_all_expenses(1)[0], get_all_expenses(1)[1]))

def get_all_income(tableId: int = 1):
    db_uri = f"sqlite:///chatbot/service/data/database.sqlite3"
    db = SQLDatabase.from_uri(db_uri)
    
    query = "SELECT date, depositAmt FROM Transactions WHERE transactionTableID = " + str(tableId)
    
    result = db._execute(query)
    
    #  Initialize lists to store date and withdrawalAmt values
    dates = []
    deposit_amts = []
    
    # Iterate over the result and split it into date and withdrawalAmt
    for row in result:
        if row['depositAmt'] is None:
            continue
        elif row['date'] in dates:
            deposit_amts[-1] += row['depositAmt']
        else:
            dates.append(row['date'])
            deposit_amts.append(row['depositAmt'])
    
    return dates, deposit_amts
# print(get_all_income(1))
# print(predict_stock_price(get_all_income(1)[0], get_all_income(1)[1]))
# predict_stock_price(get_all_expenses(1)
#         CREATE TABLE Transactions (
#     transactionTableID INTEGER,
#     transactionID TEXT PRIMARY KEY,
#     date TIMESTAMP,
#     transactionDetails TEXT,
#     description TEXT,
#     category TEXT,
#     paymentMethod TEXT,
#     withdrawalAmt REAL,
#     depositAmt REAL,

#     CONSTRAINT fk_transactionTableID
#     FOREIGN KEY(transactionTableID) REFERENCES TransactionTables(transactionTableID)
# );