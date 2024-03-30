import os
from supabase import create_client

def create_supabase_client():
    SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://wupktfazlxaxtjozgjfc.supabase.co')
    SUPABASE_KEY = os.getenv('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1cGt0ZmF6bHhheHRqb3pnamZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTYzMjU0NywiZXhwIjoyMDI3MjA4NTQ3fQ.5Aic9VBpTNRZ4KF9f8kE8BR9I6eMHuNuwrbtANuwVDw')
    return create_client(SUPABASE_URL, SUPABASE_KEY)
