import matplotlib.pyplot as plt
from create_client import create_supabase_client

def calculate_sum_by_payment_method(transaction_table_id, month):

    year =2024
    supabase = create_supabase_client()
    start_date = f'{year}-{month:02d}-01'
    end_date = f'{year}-{month:02d}-31'  # Assuming 31 days for simplicity

    query = f"""
    SELECT "paymentMethod", SUM("withdrawalAmt") AS total_expense
    FROM "Transactions"
    WHERE "transactionTableID" = {transaction_table_id}
        AND "withdrawalAmt" > 0
        AND date >= '{start_date}' AND date <= '{end_date}'     
    GROUP BY "paymentMethod"
    """
    response = supabase.table('Transactions').select(query).execute()

    if 'data' in response:
        data = response['data']        

        payment_methods = []
        total_expenses = {}

        for row in data:
            payment_method = row['paymentMethod']
            total_expense = row['withdrawalAmt']

            if payment_method in total_expenses:
                total_expenses[payment_method] += total_expense
            else:
                total_expenses[payment_method] = total_expense

        # Calculate total expenses across all payment methods
        total_expense_all = sum(total_expenses.values())

        # Custom autopct function to return percentage only
        def autopct_format(pct):
            return f'{pct:.1f}%'

        # Define a custom color palette for the pie chart
        colors = plt.cm.Set3.colors[:len(total_expenses)]
        colors = [(r, g, b, 1.0) for r, g, b in colors]

        plt.figure(figsize=(8, 8))
        pie = plt.pie(total_expenses.values(), labels=total_expenses.keys(), autopct=autopct_format, startangle=200, labeldistance=1.2, colors=colors)
        plt.title('Expenses by Payment Method', fontsize=16, weight='bold')
        
        # Add total sum beside each payment method label
        for idx, label in enumerate(pie[1]):
            payment_method = list(total_expenses.keys())[idx]
            total_expense = list(total_expenses.values())[idx]
            label.set_text(f'{payment_method}\n(RM{total_expense:.2f})')

        plt.tight_layout()
        plt.show()  

    else:
        print("Failed to calculate expenses.")
        print("Error:", response)

calculate_sum_by_payment_method(1, 1)
