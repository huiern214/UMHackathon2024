from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from langchain_community.utilities.sql_database import SQLDatabase

# Create your views here.
@csrf_exempt
def get_transactions(request):
  if request.method == 'GET':
    db_uri = f"sqlite:///chatbot/service/data/database.sqlite3"
    db = SQLDatabase.from_uri(db_uri)
    
    query = f"""
    SELECT *
    FROM "Transactions"
    WHERE "transactionTableID" = {request.GET.get('transactionTableID')}
    """
    # execute query
    data = db._execute(query)
    
    # if request.GET.get('sortBy'):
    #   data = sorted(data, key=lambda x: x[request.GET.get('sortBy')])
    
    return JsonResponse({'response': data})
    
    
    
    
  #   transactionTableID = request.GET.get('transactionTableID')
  #   dateFrom = request.GET.get('dateFrom')
  #   dateTo = request.GET.get('dateTo')
  #   sortBy = request.GET.get('sortBy')
    
  #   query = supabase.table('Transactions').select('*').eq('transactionTableID', str(transactionTableID))
    
  #   if dateFrom:
  #     query = query.gte('date', dateFrom)
  #   if dateTo:
  #     query = query.lte('date', dateTo)
  #   if sortBy:
  #     query = query.order(sortBy)
    
  #   data, count  = query.execute()
  #   data = data[1]
  #   return JsonResponse({'response': data})
  