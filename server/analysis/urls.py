from django.urls import path
from . import views

urlpatterns = [
    path('categoryExpensesByMonth', views.calculateCategoryExpensesByMonth, name='categoryExpensesByMonth'),
    path('paymentMethodExpensesByMonth', views.calculatePaymentMethodExpensesByMonth, name='paymentMethodExpenses'),
    path('test', views.test, name='test'),
    path('predictExpensesTrend', views.predict_expenses_trend, name='predictExpensesTrend'),
    path('getExpensesData', views.get_expenses_data, name='getExpensesData'),
    path('predictIncomeTrend', views.predict_income_trend, name='predictIncomeTrend'),
    path('getIncomeData', views.get_income_data, name='getIncomeData'),
    path('totalExpensesEarnings', views.calculateTotalExpensesEarnings, name='totalExpensesEarnings')
]
