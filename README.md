# Quirx
## Summary of the project
The project, named Quirx, aims to address several key challenges in personal finance management, with a focus on fraud detection, multi-user functionality, and providing insights through trend analysis and exportable query outputs.

1. Fraud Detection:
Quirx implements robust fraud detection mechanisms to identify and flag unusual transactions or amounts. By analyzing transaction patterns and detecting anomalies, users are alerted to potential fraudulent activities, helping them safeguard their finances and prevent unauthorized access.

2. Multiuser on a Device:
Quirx supports multi-user functionality on a single device, enabling families or groups to manage their finances collaboratively. This feature ensures that users can monitor and control expenditures across multiple accounts or individuals, providing peace of mind and facilitating responsible financial management.

3. Insights on Personal Finance:
Quirx offers valuable insights into personal finance through trend analysis and customizable queries. Users can visualize their spending patterns, identify areas for improvement, and make informed decisions about budgeting and saving. By exporting query outputs, users can further analyze their financial data and gain deeper insights into their financial behavior.

In summary, Quirx is a comprehensive personal finance management solution that combines advanced fraud detection, multi-user functionality, and insightful analytics to empower users in managing their finances effectively and securely. By leveraging these proposed solutions, Quirx aims to provide a holistic approach to financial management, ensuring users' financial well-being and peace of mind.

## Technologies Used
1. Frontend: ReactJS (Javascript), TailwindCSS
2. Backend: Django (Python)
3. Database: SQLite, Firestore
4. Integration & Tools: GPT 3.5 (LLM), Prophet (Forecasting ML Model), Langchain (Prompt Engineering)

## Getting Started
**Server**  
1. Open terminal
  ```
    cd server
    pip install -r requirements.txt
    python manage.py runserver
  ```
2. Access the server at `http://localhost:8000`.    

**Client**  
1. Install [Node.js]("https://nodejs.org/en/download")  
2. Open terminal
  ```
    cd client
    npm start
  ```
  if there is an error (below), run `npm install react-scripts --save` and try again
  ```
    'react-scripts' is not recognized as an internal or external command, operable program or batch file.
  ```
3. Access the web application in your web browser at `http://localhost:3000`.  
4. Extensions for VSCode:
   - ES7+ React/Redux/React-Native snippets (ID: dsznajder.es7-react-js-snippets)  
   - Tailwind CSS IntelliSense
