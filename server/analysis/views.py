from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
from django.http import JsonResponse
from .service.categoryExpensesByMonth import calculate_expenses_for_month
from .service.paymentMethodExpenses import calculate_sum_by_payment_method
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .service.trendAnalysis import predict_trend, get_all_expenses, get_all_income
from .service.total_expense_income import calculate_total_expenses_earnings

# calculate_total_expenses_earnings(transaction_table_id, month)
@csrf_exempt
def calculateTotalExpensesEarnings(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        tableId = data.get('tableId', '')
        month = data.get('month', '')

        # Call your chatbot function and get the response
        # response = generate_chat_response(user_prompt)
        result = calculate_total_expenses_earnings(tableId, month)

        # Return the response as JSON
        return JsonResponse({'response': result})

    return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def predict_expenses_trend(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        tableId = data.get('tableId', 1)

        # Get all expenses
        dates, withdrawal_amts = get_all_expenses(tableId)

        # Predict trend
        prediction = predict_trend(dates, withdrawal_amts)

        return JsonResponse(prediction, safe=False)

    return JsonResponse({'error': 'Invalid request'})

@csrf_exempt
def get_expenses_data(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        tableId = data.get('tableId', 1)
        
        # Get all expenses
        dates, withdrawal_amts = get_all_expenses(tableId)

        result = []
        for i in range(len(dates)):
            result.append({'date': dates[i], 'amt': withdrawal_amts[i]})
        
        return JsonResponse(result, safe=False)
    
    return JsonResponse({'error': 'Invalid request'})

@csrf_exempt
def predict_income_trend(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        tableId = data.get('tableId', 1)

        # Get all income
        dates, deposit_amts = get_all_income(tableId)

        # Predict trend
        prediction = predict_trend(dates, deposit_amts)

        return JsonResponse(prediction, safe=False)

    return JsonResponse({'error': 'Invalid request'})

@csrf_exempt
def get_income_data(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        tableId = data.get('tableId', 1)
        
        # Get all income
        dates, deposit_amts = get_all_income(tableId)
        
        result = []
        for i in range(len(dates)):
            result.append({'date': dates[i], 'amt': deposit_amts[i]})

        return JsonResponse(result, safe=False)

    return JsonResponse({'error': 'Invalid request'})

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