from django.urls import path
from . import views

urlpatterns = [
    path('categoryExpensesByMonth', views.calculateCategoryExpensesByMonth, name='categoryExpensesByMonth'),
    path('paymentMethodExpensesByMonth', views.calculatePaymentMethodExpensesByMonth, name='paymentMethodExpenses'),
    path('test', views.test, name='test')
]
