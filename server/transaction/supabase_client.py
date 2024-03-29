import os
from supabase_py import create_client

# Define Supabase credentials
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://wupktfazlxaxtjozgjfc.supabase.co')
SUPABASE_KEY = os.getenv('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1cGt0ZmF6bHhheHRqb3pnamZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTYzMjU0NywiZXhwIjoyMDI3MjA4NTQ3fQ.5Aic9VBpTNRZ4KF9f8kE8BR9I6eMHuNuwrbtANuwVDw')

# Create a Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Define a test function to retrieve data from Supabase
def test_supabase_connection():
    # Fetch data from a Supabase table (replace 'your_table_name' with your actual table name)
    response = supabase.table('TransactionTables').select('*').execute()

    if 'data' in response:
        data = response['data']
        print("Data retrieved successfully from Supabase:")
        print(data)
    else:
        print("Failed to retrieve data from Supabase.")
        print("Error:", response)

# Call the test function to test the Supabase connection
test_supabase_connection()