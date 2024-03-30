from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
from django.http import JsonResponse
from .service.categoryExpensesByMonth import calculate_expenses_for_month
from .service.paymentMethodExpenses import calculate_sum_by_payment_method

# Create your views here.
@csrf_exempt
def calculateCategoryExpensesByMonth(request): # Top 5 categories
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        tableId = data.get('tableId', '')
        month = data.get('month', '')

        response = calculate_expenses_for_month(tableId, month)

        # Return the response as JSON
        return JsonResponse({'response': response})

    return JsonResponse({'error': 'Invalid request method'})
# {
#     "response": {
#         "Other Expenses": 242385.91000000003,
#         "Government Services": 78652.37,
#         "Utilities": 32814.15,
#         "Debts/Overpayments": 31770.460000000003,
#         "Insurance": 11530
#     }
# }

@csrf_exempt
def calculatePaymentMethodExpensesByMonth(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        tableId = data.get('tableId', '')
        month = data.get('month', '')

        # Call your chatbot function and get the response
        # response = generate_chat_response(user_prompt)
        response = calculate_sum_by_payment_method(tableId, month)

        # Return the response as JSON
        return JsonResponse({'response': response})

    return JsonResponse({'error': 'Invalid request method'})

# Test
@csrf_exempt
def test(request):
    return JsonResponse({'response': 'Hello World!'})