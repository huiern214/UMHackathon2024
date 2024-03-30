from django.shortcuts import render
from django.http import JsonResponse
# from . import models
import os
from supabase import create_client
# import psycopg2
from django.views.decorators.csrf import csrf_exempt

# Define Supabase credentials
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://wupktfazlxaxtjozgjfc.supabase.co')
SUPABASE_KEY = os.getenv('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1cGt0ZmF6bHhheHRqb3pnamZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTYzMjU0NywiZXhwIjoyMDI3MjA4NTQ3fQ.5Aic9VBpTNRZ4KF9f8kE8BR9I6eMHuNuwrbtANuwVDw')

# Create a Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Create your views here.
@csrf_exempt
def get_transactions(request):
  if request.method == 'GET':
    transactionTableID = request.GET.get('transactionTableID')
    dateFrom = request.GET.get('dateFrom')
    dateTo = request.GET.get('dateTo')
    sortBy = request.GET.get('sortBy')
    
    query = supabase.table('Transactions').select('*').eq('transactionTableID', str(transactionTableID))
    
    if dateFrom:
      query = query.gte('date', dateFrom)
    if dateTo:
      query = query.lte('date', dateTo)
    if sortBy:
      query = query.order(sortBy)
    
    data, count  = query.execute()
    data = data[1]
    return JsonResponse({'response': data})
  
# def customQuery(sql_query):
#   try:
#     connection = psycopg2.connect(
#       dbname='postgres',
#       user='postgres.wupktfazlxaxtjozgjfc',
#       password='UMH20246thSense',
#       host='aws-0-ap-southeast-1.pooler.supabase.com',
#       port='5432'
#     )

#     cursor = connection.cursor()
    
#     cursor.execute(sql_query)

#     rows = cursor.fetchall()

#     return rows
  
#   except Exception as e:
#     print('Error:', e)

#   finally:
#     if 'cursor' in locals():
#       cursor.close()
#     if 'connection' in locals():
#       connection.close()

# def get_transaction_tables(request, user_id):
#   if request.method == 'GET':
#     transactionTables = models.TransactionTable.get(user_id=user_id)
#     return JsonResponse(transactionTables, safe=False)
  
# def add_transaction_table(request, user_id):
#   if request.method == 'POST':
#     data = request.POST
#     transactionTable = models.TransactionTable.create(user_id=user_id, transaction_table_name=data['transactionTableName'])
#     return JsonResponse(transactionTable, safe=False)
      
# print(customQuery("SELECT SUM(\"withdrawalAmt\") AS total_coffee_spending FROM \"Transactions\" WHERE \"description\"='Expenses for coffee and snacks' AND \"transactionTableID\"=1;"))
# print(customQuery("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"))