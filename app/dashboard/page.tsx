import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
export default function DashboardPage() {
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
            <main className="flex-1 p-8 overflow-auto">
              <h1 className="text-2xl font-bold">Welcome to Salesforce Manager</h1>
            </main>
          </div>
        </div>
  );
}