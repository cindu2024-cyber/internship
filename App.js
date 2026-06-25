import React, { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const addTransaction = () => {
    if (!category || !amount) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type,
      category,
      amount: Number(amount),
    };

    setTransactions([...transactions, newTransaction]);
    setCategory("");
    setAmount("");
  };

  const totalIncome = transactions
    .filter((item) => item.type === "Income")
    .reduce((acc, item) => acc + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const balance = totalIncome - totalExpense;

  const categorySummary = transactions.reduce((acc, item) => {
    if (item.type === "Expense") {
      acc[item.category] =
        (acc[item.category] || 0) + item.amount;
    }
    return acc;
  }, {});

  return (
    <div className="container">
      <h1>Daily Expense Analytics Dashboard</h1>

      <div className="form-section">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Income</option>
          <option>Expense</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={addTransaction}>
          Add Transaction
        </button>
      </div>

      <div className="summary-cards">
        <div className="card income">
          <h3>Total Income</h3>
          <p>₹ {totalIncome}</p>
        </div>

        <div className="card expense">
          <h3>Total Expense</h3>
          <p>₹ {totalExpense}</p>
        </div>

        <div className="card balance">
          <h3>Balance</h3>
          <p>₹ {balance}</p>
        </div>
      </div>

      <div className="transaction-section">
        <h2>Transactions</h2>

        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => (
              <tr key={item.id}>
                <td>{item.type}</td>
                <td>{item.category}</td>
                <td>₹ {item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="analytics">
        <h2>Category-wise Expense Analytics</h2>

        {Object.keys(categorySummary).length === 0 ? (
          <p>No expense data available.</p>
        ) : (
          <ul>
            {Object.entries(categorySummary).map(
              ([cat, amt]) => (
                <li key={cat}>
                  <span>{cat}</span>
                  <strong>₹ {amt}</strong>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;