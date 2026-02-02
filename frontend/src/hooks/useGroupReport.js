import { useEffect, useState } from "react";

const API = "http://localhost:5000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
}

export function useGroupReport(groupId) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!groupId) return;

    async function load() {
      const res = await fetch(
        `${API}/groups/${groupId}/report`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!res.ok) return;

      const data = await res.json();
      setReport(data);
      setLoading(false);
    }

    load();
  }, [groupId]);

  return { report, loading };
}
