import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Filter, Building2, MapPin, Phone, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const accounts = [
  {
    id: 1,
    name: "Acme Corporation",
    industry: "Technology",
    location: "San Francisco, CA",
    revenue: "$2.5M",
    contacts: 12,
    status: "Active",
    lastActivity: "2 days ago",
  },
  {
    id: 2,
    name: "Global Solutions Inc",
    industry: "Consulting",
    location: "New York, NY",
    revenue: "$1.8M",
    contacts: 8,
    status: "Active",
    lastActivity: "1 week ago",
  },
  {
    id: 3,
    name: "TechStart LLC",
    industry: "Software",
    location: "Austin, TX",
    revenue: "$950K",
    contacts: 5,
    status: "Prospect",
    lastActivity: "3 days ago",
  },
  {
    id: 4,
    name: "Enterprise Systems",
    industry: "Manufacturing",
    location: "Chicago, IL",
    revenue: "$3.2M",
    contacts: 15,
    status: "Active",
    lastActivity: "5 days ago",
  },
]

export default function AccountsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground">Manage your customer accounts and relationships</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Account
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search accounts..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Accounts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                    <AvatarFallback>
                      <Building2 className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{account.name}</CardTitle>
                    <CardDescription>{account.industry}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Account</DropdownMenuItem>
                    <DropdownMenuItem>Add Contact</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={account.status === "Active" ? "default" : "secondary"}>{account.status}</Badge>
                <span className="text-sm font-medium text-green-600">{account.revenue}</span>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  {account.location}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  {account.contacts} contacts
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">Last activity: {account.lastActivity}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
