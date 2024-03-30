from django.urls import path
from . import views

urlpatterns = [
    path('generateChatResponse', views.get_chat_response, name='generateChatResponse'),
    path('retrieveTables', views.retrieve_tables, name='retrieveTables'),
    path('retrieveChats', views.retrieve_chats, name='retrieveChats'),
    path('retrieveChatHistory', views.retrieve_chatHistory, name='retrieveChatHistory'),
    path('fraudDetection', views.fraudDetection, name='fraudDetection')
]
