from django.urls import path
from . import views

urlpatterns = [
    path('generateChatResponse', views.get_chat_response, name='generateChatResponse')
]
