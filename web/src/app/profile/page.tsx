"use client";

import { useEffect, useState } from "react";
import Protected from "@/lib/api/protected";
import { api } from "@/lib/api/api";

type User = {
  id: string;
  email: string;
  role?: string;
};

export default function Profile() {
  const [me, setMe] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api<User>("/users/me");
        setMe(res);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <Protected>
        <p>Loading profile...</p>
      </Protected>
    );
  }

  return (
    <Protected>
      <pre>{JSON.stringify(me, null, 2)}</pre>
    </Protected>
  );
}
