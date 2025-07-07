"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handleClick(): void {
    router.push("/api/oauth2/auth");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Button
        onClick={handleClick}
        className="text-lg px-6 py-3 transition-all duration-200 hover:scale-105"
      >
        Login with Salesforce
      </Button>
    </div>
  );
}
