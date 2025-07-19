import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"



const recentOrders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    email: "sarah.j@email.com",
    amount: "$299.00",
    status: "completed",
    initials: "SJ"
  },
  {
    id: "ORD-002", 
    customer: "Mike Chen",
    email: "mike.chen@email.com",
    amount: "$159.00",
    status: "processing",
    initials: "MC"
  },
  {
    id: "ORD-003",
    customer: "Emma Wilson",
    email: "emma.w@email.com", 
    amount: "$549.00",
    status: "completed",
    initials: "EW"
  },
  {
    id: "ORD-004",
    customer: "Alex Rodriguez",
    email: "alex.r@email.com",
    amount: "$89.00", 
    status: "pending",
    initials: "AR"
  },
  {
    id: "ORD-005",
    customer: "Lisa Park",
    email: "lisa.park@email.com",
    amount: "$399.00",
    status: "completed", 
    initials: "LP"
  }
]

const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "default"
    case "processing":
      return "secondary"
    case "pending":
      return "outline"
    default:
      return "outline"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-success text-success-foreground"
    case "processing":
      return "bg-warning text-warning-foreground"
    case "pending":
      return "bg-muted text-muted-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function RecentOrders() {
  return (
    <Card className="shadow-card bg-gradient-subtle border-0">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>
          Latest customer orders and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:shadow-subtle transition-all duration-200">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {order.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium">{order.amount}</p>
                  <p className="text-xs text-muted-foreground">{order.id}</p>
                </div>
                <Badge 
                  className={`${getStatusColor(order.status)} capitalize`}
                  variant={getStatusVariant(order.status)}
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}