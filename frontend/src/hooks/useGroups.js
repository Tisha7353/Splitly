import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5000/api/groups";

export function useGroups() {
  const { token } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setGroups(data);
        setLoading(false);
      });
  }, [token]);

  return { groups, loading, setGroups };
}

export function useCreateGroup() {
  const { token } = useAuth();

  const createGroup = async (groupData) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(groupData),
    });

    if (!res.ok) {
      throw new Error("Failed to create group");
    }

    return res.json();
  };

  return { createGroup };
}
export function useGroup(id) {
  const { token } = useAuth();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !token) return;

    fetch(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setGroup(data);
        setLoading(false);
      });
  }, [id, token]);

  function addMemberLocal(member) {
    setGroup(prev => ({
      ...prev,
      members: [...prev.members, member],
    }));
  }

  return { group, loading, addMemberLocal };
}
/* ================= ADD MEMBER ================= */
export function useAddMember() {
  const { token } = useAuth();

  const addMember = async ({ groupId, email }) => {
    const res = await fetch(`${API_URL}/${groupId}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to add member");
    }

    return data;
  };

  return { addMember };
}