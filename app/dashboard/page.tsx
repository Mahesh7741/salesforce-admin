'use client';
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("connected") === "1") {
      fetch("/api/session")
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            localStorage.setItem("sf_session", JSON.stringify(data));
          }
          // Remove the query param from the URL
          router.replace("/dashboard");
        });
    }
  }, [searchParams, router]);

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar at the top spanning full width */}
      <Navbar />

      {/* Main content area with sidebar and content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left */}
        <div className="h-full">
          <Sidebar />
        </div>

        {/* Main content area */}
        <main className="flex-1 p-2 overflow-auto">
          <h1 className="text-2xl font-bold">Welcome to Salesforce Manager</h1>
          <p className="mt-4 text-gray-600">
            This is your dashboard where you can manage Salesforce data, view reports, and perform administrative tasks.
          </p>
        </main>
      </div>
    </div>
  );
}
