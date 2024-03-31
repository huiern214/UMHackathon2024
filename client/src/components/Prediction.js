import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import ForecastPlot from './ForecastPlot'; // Assuming you have the ForecastPlot component in a separate file

const Prediction = (
    selectedUser, // selectedUser.tableID
) => {
    // const [forecastData, setForecastData] = useState([]);
    // const [actualData, setActualData] = useState([]);
    const [incomeForecastData, setIncomeForecastData] = useState([]);
    const [expenseForecastData, setExpenseForecastData] = useState([]);

    const [incomeActualData, setIncomeActualData] = useState([]);
    const [expenseActualData, setExpenseActualData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // predictExpensesTrend
// predictIncomeTrend
// getExpensesData
// getIncomeData

    const fetchIncomeForecastData = async () => {
        try {
            const response = await api.post('/analysis/predictIncomeTrend',
                {
                    "tableId": selectedUser.tableID
                });
            setIncomeForecastData(response.data);
            console.log(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    const fetchExpenseForecastData = async () => {
        try {
            const response = await api.post('/analysis/predictExpensesTrend',
                {
                    "tableId": selectedUser.tableID
                });
            setExpenseForecastData(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    const fetchIncomeActualData = async () => {
        try {
            const response = await api.post('/analysis/getIncomeData',
                {
                    "tableId": selectedUser.tableID
                });
            setIncomeActualData(response.data);
            console.log(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    const fetchExpenseActualData = async () => {
        try {
            const response = await api.post('/analysis/getExpensesData',
                {
                    "tableId": selectedUser.tableID
                });
            setExpenseActualData(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchIncomeForecastData();
        fetchExpenseForecastData();
        fetchIncomeActualData();
        fetchExpenseActualData();
    }, [selectedUser]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="mx-3 md:mx-0 border rounded-lg mt-6">
            <p className="pl-5 mb-1 text-xl font-bold text-gray-700 mt-5">
            Trend Analysis
            </p>
            {/* <ForecastPlot actualData={actualData} forecastData={forecastData} nYears={1} /> Change nYears as needed */}
            <div className="pl-5 mb-1 text-xl font-bold text-gray-700 mt-5">
                Income
            </div>
            <ForecastPlot
                // actualData, forecastData
                actualData={incomeActualData}
                forecastData={incomeForecastData}
            />

            <div className="pl-5 mb-1 text-xl font-bold text-gray-700 mt-5">
                Expenses
            </div>
            <ForecastPlot
                // actualData, forecastData
                actualData={expenseActualData}
                forecastData={expenseForecastData}
            />
        </div>
    );
};

export default Prediction;