
import { AppLayout } from "@/components/layout/app-layout"
// Import the simplified version
import OrdersClient from "@/components/orders/orders-client-simple"

export default function OrdersPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <OrdersClient />
      </div>
    </AppLayout>
  )
}
