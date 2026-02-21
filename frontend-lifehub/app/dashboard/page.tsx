"use client"

import { Button } from "@/components/Button/Button";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { logout } = useAuth();
  return (
    <div>
      <ProtectedRoute>
        <h1>Hello Dashboard!</h1>
        <Button onClick={() => logout()}>Sair</Button>
      </ProtectedRoute>
    </div>
  );
}
