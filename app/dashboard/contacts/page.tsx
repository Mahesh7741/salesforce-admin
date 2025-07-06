import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Filter, Mail, Phone, Building2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const contacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "VP of Sales",
    company: "Acme Corporation",
    email: "sarah.johnson@acme.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    lastContact: "2 days ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "CTO",
    company: "TechStart LLC",
    email: "m.chen@techstart.com",
    phone: "+1 (555) 987-6543",
    status: "Active",
    lastContact: "1 week ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Marketing Director",
    company: "Global Solutions Inc",
    email: "emily.r@globalsolutions.com",
    phone: "+1 (555) 456-7890",
    status: "Prospect",
    lastContact: "3 days ago",
  },
  {
    id: 4,
    name: "David Kim",
    title: "Operations Manager",
    company: "Enterprise Systems",
    email: "david.kim@enterprise.com",
    phone: "+1 (555) 321-0987",
    status: "Active",
    lastContact: "5 days ago",
  },
]

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground">Manage your business contacts and relationships</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Contact
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search contacts..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contacts List */}
      <div className="grid gap-4">
        {contacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                    <AvatarFallback>
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{contact.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-3 w-3" />
                      {contact.company}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3" />
                      {contact.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3" />
                      {contact.phone}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={contact.status === "Active" ? "default" : "secondary"}>{contact.status}</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Send Email</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Call</DropdownMenuItem>
                        <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-muted-foreground">Last contact: {contact.lastContact}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
