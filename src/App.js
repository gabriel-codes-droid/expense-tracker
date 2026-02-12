import { useState, useEffect } from "react";
function ExpenseTracker() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (description.trim() === "" || amount === "") return;

    const newTransaction = {
      id: Date.now(),
      amount: Number(amount),
      description: description,
    };

    setTransactions((prev) => [...prev, newTransaction]);
    setDescription("");
    setAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };
  const totalBalance = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
  const totalIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

  return (
    <div>
      <h1>Expense Tracker </h1>
      <h2>Balance is :${totalBalance}</h2>
      <h3>Total expenses :${totalExpense}</h3>
      <h4>Total income is :${totalIncome}</h4>

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={addTransaction}>Add</button>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.description}-${transaction.amount}
            <button onClick={() => deleteTransaction(transaction.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ExpenseTracker;
