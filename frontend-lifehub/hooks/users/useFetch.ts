  "use client";

  import { useEffect, useState } from "react";
  import { getMe } from "@/api/users.api";
  import { User } from "@/types/User";

  export function useFetchUser(token: string | null) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!token) {
        setLoading(false);
        return;
      }

      async function fetchUser() {
        try {
          const data = await getMe();
          setUser(data);
        } catch {
          setUser(null);
        } finally {
          setLoading(false);
        }
      }

      fetchUser();
    }, [token]);

    return { user, loading };
  }