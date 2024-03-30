from django.shortcuts import render
from django.http import JsonResponse
import os
from supabase import create_client
from django.views.decorators.csrf import csrf_exempt
import statistics

# Define Supabase credentials
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://wupktfazlxaxtjozgjfc.supabase.co')
SUPABASE_KEY = os.getenv('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1cGt0ZmF6bHhheHRqb3pnamZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTYzMjU0NywiZXhwIjoyMDI3MjA4NTQ3fQ.5Aic9VBpTNRZ4KF9f8kE8BR9I6eMHuNuwrbtANuwVDw')

# Create a Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Create your views here.
# @csrf_exempt
# def detect_suspicions(request):
#   if request.method == 'GET':
#     year = request.GET.get('year')
#     month = request.GET.get('month')
#     transactionTableID = request.GET.get('transactionTableID')

#   query = supabase.table('Transactions').select('*').eq('transactionTableID', str(transactionTableID)).like('date', f'%-{year}-{month}-%')
#   data, count = query.execute()
#   transactions = data[1]

#   categories = set(transaction['category'] for transaction in transactions)
#   category_medians = {}
#   for category in categories:
#     category_transactions = [transaction for transaction in transactions if transaction['category'] == category]
#     amounts = [transaction['amount'] for transaction in category_transactions]
#     category_medians[category] = statistics.median(amounts)

#   suspicious_transactions = []
#   for transaction in transactions:
#     category = transaction['category']
#     amount = transaction['amount']
#     median = category_medians[category]
#     margin = 0.2  # Adjust this margin as needed
#     if amount > median * (1 + margin):
#       suspicious_transactions.append(transaction)
  
#   return JsonResponse({'suspicious_transactions': suspicious_transactions})

@csrf_exempt
def detect_suspicions(request):
  if request.method == 'GET':
    year = request.GET.get('year')
    month = request.GET.get('month')
    transactionTableID = request.GET.get('transactionTableID')

    query = supabase.table('Transactions').select('*').eq('transactionTableID', str(transactionTableID))
    query = query.gte('date', f'{year}-{month}-01')
    query = query.lte('date', f'{year}-{month}-31')

    data, count = query.execute()

    categories = set(transaction['category'] for transaction in data)
    category_medians = {}
    for category in categories:
      category_transactions = [transaction for transaction in data if transaction['category'] == category]
      withdrawal_amounts = [transaction['withdrawalAmt'] for transaction in category_transactions if transaction['withdrawalAmt'] != 0]
      deposit_amounts = [transaction['depositAmt'] for transaction in category_transactions if transaction['depositAmt'] != 0]
      withdrawal_median = statistics.median(withdrawal_amounts) if withdrawal_amounts else 0
      deposit_median = statistics.median(deposit_amounts) if deposit_amounts else 0
      category_medians[category] = {'withdrawal_median': withdrawal_median, 'deposit_median': deposit_median}

    # Identify outliers
    outliers = []
    for transaction in data:
      category = transaction['category']
      withdrawal_amount = transaction['withdrawalAmt']
      deposit_amount = transaction['depositAmt']
      withdrawal_median = category_medians[category]['withdrawal_median']
      deposit_median = category_medians[category]['deposit_median']
      margin = 0.2  # Adjust this margin as needed
      if withdrawal_amount != 0 and withdrawal_amount > withdrawal_median * (1 + margin):
        outliers.append(transaction)
      elif deposit_amount != 0 and deposit_amount > deposit_median * (1 + margin):
        outliers.append(transaction)

    return JsonResponse({'suspicious_transactions': outliers})