import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Download, Calendar, FileText, PieChart, Activity } from "lucide-react"

const reports = [
  {
    id: 1,
    name: "Sales Performance",
    description: "Monthly sales metrics and KPIs",
    type: "Sales",
    lastUpdated: "2 hours ago",
    status: "Ready",
  },
  {
    id: 2,
    name: "Account Analysis",
    description: "Customer account health and engagement",
    type: "Accounts",
    lastUpdated: "1 day ago",
    status: "Ready",
  },
  {
    id: 3,
    name: "Pipeline Forecast",
    description: "Revenue forecasting and pipeline analysis",
    type: "Forecast",
    lastUpdated: "3 hours ago",
    status: "Processing",
  },
  {
    id: 4,
    name: "Activity Summary",
    description: "Team activity and productivity metrics",
    type: "Activity",
    lastUpdated: "5 hours ago",
    status: "Ready",
  },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Analytics and insights for your sales data</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Create Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Auto-generated weekly</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Sources</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Connected systems</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <div className="grid gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    {report.type === "Sales" && <TrendingUp className="h-6 w-6 text-primary" />}
                    {report.type === "Accounts" && <BarChart3 className="h-6 w-6 text-primary" />}
                    {report.type === "Forecast" && <PieChart className="h-6 w-6 text-primary" />}
                    {report.type === "Activity" && <Activity className="h-6 w-6 text-primary" />}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{report.name}</h3>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Last updated: {report.lastUpdated}</span>
                      <Badge variant="outline">{report.type}</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={report.status === "Ready" ? "default" : "secondary"}>{report.status}</Badge>
                  {report.status === "Ready" && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
