from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .service.chatbot import get_response, retrieve_all_tables, retrieve_chats_by_tableId, retrieve_chat_history
from .service.fraudDetection import fraud_detection
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
      
@csrf_exempt
def retrieve_tables(request):
  if request.method == 'POST':
    data = json.loads(request.body.decode('utf-8'))
    userId = data.get('userId', 1)
    tables = retrieve_all_tables(userId)
    
    return JsonResponse({'tables': tables})
  
@csrf_exempt
def retrieve_chats(request):
  if request.method == 'POST':
    data = json.loads(request.body.decode('utf-8'))
    tableId = data.get('tableId', 1)
    chats = retrieve_chats_by_tableId(tableId)
    
    return JsonResponse({'chats': chats})

@csrf_exempt
def retrieve_chatHistory(request):
  if request.method == 'POST':
    data = json.loads(request.body.decode('utf-8'))
    chatId = data.get('chatId', '')
    
    response = retrieve_chat_history(chatId)
    
    return JsonResponse({'response': response})
  
@csrf_exempt
def fraudDetection(request):
  if request.method == 'POST':
    data = json.loads(request.body.decode('utf-8'))
    tableId = data.get('tableId', 1)
    
    response = fraud_detection(tableId)
    
    return JsonResponse({'response': response})