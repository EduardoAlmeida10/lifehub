"use client";

import { items } from "./items";
import ItemMenu from "./itemMenu";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Sidebar() {
  const { logout } = useAuth();
  return (
    <aside className="flex flex-col w-64 h-full justify-between p-4 bg-secondary">
        <div>
          <nav className="flex flex-col gap-2">
            {items.map((item) => (
              <ItemMenu
                key={item.href}
                label={item.label}
                href={item.href}
                icon={item.icon}
              />
            ))}
          </nav>
        </div>
        <footer className="w-full">
          <button
            className="flex items-center gap-3 bg-foreground text-white hover:bg-purple-900 cursor-pointer px-4 py-3 rounded-lg w-full"
            onClick={() => logout()}
          >
            <LogOut />
            Sair
          </button>
        </footer>
    </aside>
  );
}
