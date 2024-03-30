from django.db import models
# from .supabase_client import supabase

# Create your models here.
# class Transaction(models.Model):
#   transactionID = models.AutoField(primary_key=True)
#   transactionTableID = models.BigIntegerField()
#   date = models.DateField()
#   transactionDetails = models.TextField()
#   description = models.TextField()
#   category = models.TextField()
#   paymentMethod = models.TextField()
#   withdrawalAmt = models.FloatField()
#   depositAmt = models.FloatField()

#   @staticmethod
#   def create_transaction(data):
#     result = supabase.table('Transactions').insert(data).execute()
#     return result.data
  
#   @staticmethod
#   def read_transaction(transactionID):
#     result = supabase.table('Transactions').select('*').eq('transactionID', transactionID).execute()
#     return result.data
  
#   @staticmethod
#   def update_transaction(transactionID, data):
#     result = supabase.table('Transactions').update(data).eq('transactionID', transactionID).execute()
#     return result.data
  
#   @staticmethod
#   def delete_transaction(transactionID):
#     result = supabase.table('Transactions').delete().eq('transactionID', transactionID).execute()
#     return result.data
  
#   @staticmethod
#   def get_transactions_for_table(transactionTableID):
#     result = supabase.table('Transactions').select('*').eq('transactionTableID', transactionTableID).execute()
#     return result.data
  
#   def custom_query(sql_query):
#     return Transaction.objects.raw(sql_query)
  
# class TransactionTable(models.Model):
#   transactionTableID = models.AutoField(primary_key=True)
#   userID = models.BigIntegerField()
#   transactionTableName = models.TextField()
  
#   @staticmethod
#   def create_transaction_table(data):
#     result = supabase.table('TransactionTables').insert(data).execute()
#     return result.data
  
#   @staticmethod
#   def read_transaction_table(transactionTableID):
#     result = supabase.table('TransactionTables').select('*').eq('transactionTableID', transactionTableID).execute()
#     return result.data
  
#   @staticmethod
#   def update_transaction_table(transactionTableID, data):
#     result = supabase.table('TransactionTables').update(data).eq('transactionTableID', transactionTableID).execute()
#     return result.data
  
#   @staticmethod
#   def delete_transaction_table(transactionTableID):
#     result = supabase.table('TransactionTables').delete().eq('transactionTableID', transactionTableID).execute()
#     return result.data
  
#   @staticmethod
#   def get_transaction_tables_for_user(userID):
#     result = supabase.table('TransactionTables').select('transactionTableID', 'transactionTableName').eq('userID', userID).execute()
#     return result.data
  
#   def custom_query(sql_query):
#     return TransactionTable.objects.raw(sql_query)

# # tester
# if __name__ == '__main__':
#   print(TransactionTable.custom_query("SELECT * FROM transaction_transactiontable WHERE transactionTableName = 'Test Table'"))