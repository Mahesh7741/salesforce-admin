// import type React from "react"
// import { Sidebar } from "@/components/dashboard/sidebar"
// import { Header } from "@/components/dashboard/header"

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <div className="flex h-screen bg-background">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />
//         <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
//           <div className="max-w-7xl mx-auto">{children}</div>
//         </main>
//       </div>
//     </div>
//   )
// }


import type React from "react"
import { ResizableSidebar } from "@/components/dashboard/resizable-sidebar"
import { Header } from "@/components/dashboard/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <ResizableSidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
