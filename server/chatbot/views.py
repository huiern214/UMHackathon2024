from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .service.chatbot import get_response
import json

# Create your views here.
@csrf_exempt
def get_chat_response(request):
  if request.method == 'POST':
    data = json.loads(request.body.decode('utf-8'))
    userPrompt = data.get('userPrompt', '')
    userId = data.get('userId', 1)
    tableId = data.get('tableId', 1)
    chatId = data.get('chatId', '')
    
    response = get_response(userPrompt, userId, tableId, chatId)
    
    return JsonResponse({'response': response})
      
# @csrf_exempt
# def calculateCategoryExpensesByMonth(request): # Top 5 categories
#     if request.method == 'POST':
#         data = json.loads(request.body.decode('utf-8'))
#         tableId = data.get('tableId', '')
#         month = data.get('month', '')

#         response = calculate_expenses_for_month(tableId, month)

#         # Return the response as JSON
#         return JsonResponse({'response': response})

#     return JsonResponse({'error': 'Invalid request method'})