from django.db import models
from supabase_client import supabase

# Create your models here.
class Transaction(models.Model):
  transactionID = models.TextField()
  transactionTableID = models.BigIntegerField()
  date = models.DateField()
  transactionDetails = models.TextField()
  description = models.TextField()
  category = models.TextField()
  paymentMethod = models.TextField()
  withdrawalAmt = models.FloatField()
  depositAmt = models.FloatField()

  @staticmethod
  def create_transaction(data):
    result = supabase.table('transactions').insert(data).execute()
    return result.data
  
  @staticmethod
  def get_transaaction(transactionID):
    result = supabase.table('transactions').select('*').eq('transactionID', transactionID).execute()
    return result.data
  
  def custom_query(sql_query):
    return Transaction.objects.raw(sql_query)
  
class TransactionTable(models.Model):
  transactionTableID = models.BigIntegerField()
  userID = models.BigIntegerField()
  transactionTableName = models.TextField()

  @staticmethod
  def get_transaction_tables_for_user(userID):
    result = supabase.table('transaction_tables').select('transactionTableID', 'transactionTableName').eq('userID', userID).execute()
    return result.data
  
  @staticmethod
  def create_transaction_table(data):
    result = supabase.table('transaction_tables').insert(data).execute()
    return result.data
  
  @staticmethod
  def get_transaction_table(transactionTableID):
    result = supabase.table('transaction_tables').select('*').eq('transactionTableID', transactionTableID).execute()
    return result.data
  
  def custom_query(sql_query):
    return TransactionTable.objects.raw(sql_query)

# tester
if __name__ == '__main__':
  print(TransactionTable.custom_query("SELECT * FROM transaction_transactiontable WHERE transactionTableName = 'Test Table'"))