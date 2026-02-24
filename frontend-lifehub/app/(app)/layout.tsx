import type { Metadata } from "next";
import "../globals.css";
import { Montserrat } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/SideBar/SideBar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { NavBar } from "@/components/NavBar/NavBar";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LifeHub",
  description: "Sistema pessoal de organização",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`h-screen ${montserrat.className}`}>
        <AuthProvider>
          <ProtectedRoute>
            <div className="flex flex-col h-full">
              <NavBar />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 overflow-auto">{children}</main>
              </div>
            </div>
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
