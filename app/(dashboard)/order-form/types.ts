// Define types for form data and errors
export interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  product: string;
  quantity: number;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phoneNumber?: string;
  product?: string;
  quantity?: string;
}
export enum OrderStatus {
  PLACED = "Order Placed",             // Initial status when the order is placed
  SWITCH_MANUFACTURING = "Switch in Manufacturing", // Switch is being manufactured/assembled
  LEFT_WAREHOUSE = "Left Warehouse",   // Order has left the warehouse
  IN_TRANSIT = "In Transit",           // Order is on its way to the destination
  OUT_FOR_DELIVERY = "Out for Delivery", // Final delivery stage
  DELIVERED = "Delivered"              // Order successfully delivered
}

