import { useEffect, useState } from "react";

const API = "http://localhost:5000";

export function useSettlements(groupId) {
  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */

  useEffect(() => {
    if (!groupId) return;

    let cancelled = false;

    async function fetchData() {
      setLoading(true);

      try {
        const res = await fetch(
          `${API}/groups/${groupId}/settlements`,
          { headers: getAuthHeaders() }
        );

        if (!res.ok) return;

        const data = await res.json();

        if (!cancelled) setSettlements(data);
      } catch (err) {
        console.error(err);
      }

      if (!cancelled) setLoading(false);
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [groupId]);

  /* ================= ADD ================= */

  async function addSettlement(data) {
    try {
      const res = await fetch(
        `${API}/groups/${groupId}/settlements`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        console.error("Settlement failed:", res.status);
        return;
      }

      const saved = await res.json();

      // ✅ instant UI update
      setSettlements((prev) => [saved, ...prev]);
    } catch (err) {
      console.error("Settlement error:", err);
    }
  }

  return { settlements, loading, addSettlement };
}

/* ================= AUTH ================= */

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}
