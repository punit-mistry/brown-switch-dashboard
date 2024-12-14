"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { Input } from "./ui/input";
import supabase from "@/utils/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Order } from "@/app/(dashboard)/order/types";
import { OrderStatus } from "@/app/(dashboard)/order-form/types";

interface OrderEditDialogProps {
  currentOrder: Order;
  onOrderUpdate: (order: Order) => void;
}

const OrderEditDialog = ({ currentOrder,onOrderUpdate }: OrderEditDialogProps) => {
  const { toast } = useToast();
  const [status, setStatus] = useState<string>(currentOrder?.order_status);
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedOrder = { ...currentOrder, order_status: status };

    const { data, error } = await supabase
      .from("brown-switches-table")
      .update({ ...updatedOrder })
      .eq("id", updatedOrder.id)
      .select();
    if (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Success",
      description: "Order updated successfully",
      variant: "default",
    });
    console.log("Order updated:", data);
    onOrderUpdate(data[0]); // Pass updated order to parent
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild className="hover:cusor-pointer" onClick={() => setIsOpen(true)}>
        <Pencil className="w-5 h-5" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Order Status</DialogTitle>
        </DialogHeader>
        {currentOrder && (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  Order ID
                </Label>
                <Input
                  id="id"
                  value={currentOrder.id}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer_name" className="text-right">
                  Customer Name
                </Label>
                <Input
                  id="customer_name"
                  value={currentOrder.customer_name}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product" className="text-right">
                  Product
                </Label>
                <Input
                  id="product"
                  value={currentOrder.product}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  value={currentOrder.quantity}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="total_price" className="text-right">
                  Total Price
                </Label>
                <Input
                  id="total_price"
                  value={currentOrder.total_price}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(OrderStatus).map((statusOption) => (
                      <SelectItem key={statusOption} value={statusOption}>
                        {statusOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" >Save changes</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderEditDialog;
