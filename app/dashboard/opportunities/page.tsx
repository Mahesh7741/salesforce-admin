import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Plus, Filter, DollarSign, Calendar, TrendingUp, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const opportunities = [
  {
    id: 1,
    name: "Enterprise Software License",
    account: "Acme Corporation",
    value: "$125,000",
    stage: "Proposal",
    probability: 75,
    closeDate: "2024-02-15",
    owner: "Sarah Johnson",
  },
  {
    id: 2,
    name: "Cloud Migration Project",
    account: "Global Solutions Inc",
    value: "$89,000",
    stage: "Negotiation",
    probability: 60,
    closeDate: "2024-01-30",
    owner: "Michael Chen",
  },
  {
    id: 3,
    name: "Marketing Automation Setup",
    account: "TechStart LLC",
    value: "$45,000",
    stage: "Qualification",
    probability: 40,
    closeDate: "2024-03-10",
    owner: "Emily Rodriguez",
  },
  {
    id: 4,
    name: "System Integration",
    account: "Enterprise Systems",
    value: "$200,000",
    stage: "Prospecting",
    probability: 25,
    closeDate: "2024-04-20",
    owner: "David Kim",
  },
]

const getStageColor = (stage: string) => {
  switch (stage) {
    case "Prospecting":
      return "secondary"
    case "Qualification":
      return "outline"
    case "Proposal":
      return "default"
    case "Negotiation":
      return "destructive"
    default:
      return "secondary"
  }
}

export default function OpportunitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Opportunities</h1>
          <p className="text-muted-foreground">Track and manage your sales opportunities</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Opportunity
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search opportunities..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Opportunities Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {opportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{opportunity.name}</CardTitle>
                  <CardDescription>{opportunity.account}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Opportunity</DropdownMenuItem>
                    <DropdownMenuItem>Update Stage</DropdownMenuItem>
                    <DropdownMenuItem>Add Activity</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-lg font-semibold text-green-600">
                  <DollarSign className="h-4 w-4" />
                  {opportunity.value}
                </div>
                <Badge variant={getStageColor(opportunity.stage)}>{opportunity.stage}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Probability</span>
                  <span>{opportunity.probability}%</span>
                </div>
                <Progress value={opportunity.probability} className="h-2" />
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  Close Date: {new Date(opportunity.closeDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3" />
                  Owner: {opportunity.owner}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
