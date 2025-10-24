
import { AppLayout } from "@/components/layout/app-layout"
// Import the full Orders component  
import { OrdersClient } from "@/components/orders/orders-client"

export default function OrdersPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <OrdersClient />
      </div>
    </AppLayout>
  )
}
