import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5000/api/expenses";

export function useExpenses(groupId) {
  const { token } = useAuth();

  /* ================= GET ================= */
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!groupId || !token) return;

    fetch(`${API_URL}/${groupId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data);
        setLoading(false);
      });
  }, [groupId, token]);

  /* ================= ADD ================= */
  const addExpense = async (expenseData) => {
    if (!groupId) {
      throw new Error("Group ID missing");
    }

    const res = await fetch(`${API_URL}/${groupId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(expenseData),
    });

    if (!res.ok) {
      throw new Error("Failed to add expense");
    }

    const newExpense = await res.json();
    setExpenses((prev) => [newExpense, ...prev]);
    return newExpense;
  };

  return { expenses, loading, addExpense };
}
