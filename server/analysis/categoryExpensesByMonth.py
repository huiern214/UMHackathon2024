import matplotlib.pyplot as plt
from create_client import create_supabase_client

def calculate_expenses_for_month(transaction_table_id, year, month):
    supabase = create_supabase_client()
    start_date = f'{year}-{month:02d}-01'
    end_date = f'{year}-{month:02d}-31'  # Assuming 31 days for simplicity

    query = f"""
    SELECT "category", SUM("withdrawalAmt") AS total_expense
    FROM "Transactions"
    WHERE "transactionTableID" = {transaction_table_id}
        AND ("withdrawalAmt" > 0 AND "category" != 'Income/Salary')
        AND date >= '{start_date}' AND date <= '{end_date}'     
    GROUP BY "category"
    """
    response = supabase.table('Transactions').select(query).execute()

    if 'data' in response:
        data = response['data']        

        categories = []
        total_expenses = {}

        for row in data:
            category = row['category']
            total_expense = row['withdrawalAmt']

            if category in total_expenses and category != 'Income/Salary':
                total_expenses[category] += total_expense
            else:
                total_expenses[category] = total_expense

        sorted_expenses = dict(sorted(total_expenses.items(), key=lambda item: item[1], reverse=True))
        top_categories = list(sorted_expenses.keys())[:5]
        top_expenses = [sorted_expenses[category] for category in top_categories]
        
        # Custom autopct function to display only the percentage
        def autopct_format(pct):
            return f'{pct:.1f}%'
        
        plt.figure(figsize=(8, 8))
        pie = plt.pie(top_expenses, labels=top_categories, autopct=autopct_format, startangle=140)
        plt.title('Top 5 Expense Categories', fontsize=16, weight='bold')
        
        # Add total sum below each category label
        for idx, label in enumerate(pie[1]):
            label.set_text(f'{top_categories[idx]}\nRM{top_expenses[idx]:.2f}')
        
        plt.tight_layout()
        plt.show()

    else:
        print("Failed to calculate expenses.")
        print("Error:", response)

calculate_expenses_for_month(1, 2024, 1)
