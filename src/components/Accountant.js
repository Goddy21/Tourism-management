import React, { useState, useEffect } from "react";
import "./Accountant.css";

const Accountant = () => {
  const [financialSummary, setFinancialSummary] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
  });
  const [invoiceDetails, setInvoiceDetails] = useState({ customerName: "", amount: 0, description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Financial Summary
  useEffect(() => {
    fetch("http://localhost:5000/finance/summary")
      .then((response) => response.json())
      .then((data) => {
        setFinancialSummary(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch financial summary. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Generate Invoice
  const handleGenerateInvoice = () => {
    if (!invoiceDetails.customerName || !invoiceDetails.amount || !invoiceDetails.description) {
      alert("All fields are required to generate an invoice.");
      return;
    }
    if (invoiceDetails.amount <= 0) {
      alert("Amount must be a positive number.");
      return;
    }

    fetch("http://localhost:5000/finance/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoiceDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setInvoiceDetails({ customerName: "", amount: 0, description: "" });
      })
      .catch((err) => console.error("Error generating invoice:", err));
  };

  if (loading) {
    return <p className="loading">Loading financial summary...</p>;
  }

  return (
    <div className="accountant-container">
      <div className="header">
        <h2>Accountant Dashboard</h2>
      </div>

      <div className="accountant-content">
        {/* Financial Summary */}
        <div className="accountant-stats">
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p>${financialSummary.totalRevenue}</p>
          </div>
          <div className="stat-card">
            <h3>Total Expenses</h3>
            <p>${financialSummary.totalExpenses}</p>
          </div>
          <div className="stat-card">
            <h3>Net Profit</h3>
            <p>${financialSummary.netProfit}</p>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Accountant Actions */}
        <div className="accountant-actions">
          <button onClick={() => alert("Feature coming soon!")}>View Financial Reports</button>
          <button onClick={() => alert("Feature coming soon!")}>Manage Payments</button>

          <div>
            <h3>Generate Invoice</h3>
            <input
              type="text"
              placeholder="Customer Name"
              value={invoiceDetails.customerName}
              onChange={(e) => setInvoiceDetails({ ...invoiceDetails, customerName: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              value={invoiceDetails.amount}
              onChange={(e) => setInvoiceDetails({ ...invoiceDetails, amount: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={invoiceDetails.description}
              onChange={(e) => setInvoiceDetails({ ...invoiceDetails, description: e.target.value })}
            />
            <button onClick={handleGenerateInvoice}>Generate Invoice</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accountant;
