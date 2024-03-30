import sqlite3
import pandas as pd


def insertTransactionTableToSQLite(sqlite_file_path=None, csv_file_path=None, userId=1, transactionTableId=None):
    """
    Insert csv file into sqlite3 database
    """
    conn = sqlite3.connect(sqlite_file_path)
    c = conn.cursor()

    # Read csv file and trim the column names whitespace
    df = pd.read_csv(csv_file_path, thousands=',')
    df.columns = df.columns.str.strip()
    # convert from 1-Jan-24 to Date format for sql
    df['DATE'] = pd.to_datetime(
        df['DATE'], errors='coerce').dt.strftime('%Y-%m-%d')

    userId = 1

    # If transactionTableId is not provided, insert (userId, transactionTableName) into TransactionTables
    if transactionTableId is None:
        transactionTableName = csv_file_path.split('/')[-1].split('.')[0]
        c.execute("INSERT INTO TransactionTables (userID, transactionTableName) VALUES (?, ?)",
                  (userId, transactionTableName))
        c.execute("SELECT transactionTableID FROM TransactionTables WHERE userID = ? AND transactionTableName = ?",
                  (userId, transactionTableName))
        transactionTableId = c.fetchone()[0]

    # Insert data into sqlite3
    # csv column name: TRANSACTION ID,DATE,TRANSACTION DETAILS,DESCRIPTION,CATEGORY,PAYMENT METHOD, WITHDRAWAL AMT , DEPOSIT AMT
    try:
        for index, row in df.iterrows():
            # if transactionTableId duplicate, skip
            if c.execute("SELECT * FROM Transactions WHERE transactionTableID = ? AND transactionID = ?", (transactionTableId, row['TRANSACTION ID'])).fetchone() is not None:
                continue
            c.execute("INSERT INTO Transactions (transactionTableID, transactionID, date, transactionDetails, description, category, paymentMethod, withdrawalAmt, depositAmt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                      (transactionTableId, row['TRANSACTION ID'], row['DATE'], row['TRANSACTION DETAILS'], row['DESCRIPTION'], row['CATEGORY'], row['PAYMENT METHOD'], row['WITHDRAWAL AMT'], row['DEPOSIT AMT']))
    except sqlite3.IntegrityError:
        print('ERROR: ID already exists in PRIMARY KEY column {}'.format(
            'transactionID'))
        print('ID: {}'.format(row['TRANSACTION ID']))

    conn.commit()


insertTransactionTableToSQLite(sqlite_file_path='chatbot/data/database.sqlite3',
                               csv_file_path='chatbot/data/Ahmad.csv', userId=1, transactionTableId=None)

insertTransactionTableToSQLite(sqlite_file_path='chatbot/data/database.sqlite3',
                               csv_file_path='chatbot/data/Bryan.csv', userId=1, transactionTableId=None)

insertTransactionTableToSQLite(sqlite_file_path='chatbot/data/database.sqlite3',
                               csv_file_path='chatbot/data/Charles.csv', userId=1, transactionTableId=None)

insertTransactionTableToSQLite(sqlite_file_path='chatbot/data/database.sqlite3',
                               csv_file_path='chatbot/data/Danish.csv', userId=1, transactionTableId=None)

insertTransactionTableToSQLite(sqlite_file_path='chatbot/data/database.sqlite3',
                               csv_file_path='chatbot/data/Emily.csv', userId=1, transactionTableId=None)

# CURRENT SCHEMA
# TransactionTables
# transactionTableID, userID, transactionTableName

# Transactions
# transactionTableID (FK), transactionID (PK), date, transactionDetails, description, category, paymentMethod, withdrawalAmt, depositAmt
