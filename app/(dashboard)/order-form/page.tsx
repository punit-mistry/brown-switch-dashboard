"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormData, FormErrors, OrderStatus } from "./types";
import supabase from "@/utils/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Invoice from "./Invoice";
import { useUser, useAuth } from "@clerk/nextjs";
import { Copy } from 'lucide-react';
import { sendNewOrderNotification } from "@/utils/notificationService";

const FIELDS = [
  { id: "name", label: "Name", type: "text", placeholder: "Enter your name" },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter your phone number",
  },
  {
    id: "quantity",
    label: "Quantity",
    type: "number",
    placeholder: "Enter quantity",
    min: 1,
  },
];

interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

interface InvoiceFormData {
  customer_name: string;
  customer_email: string;
  customer_number: string;
  product: string;
  quantity: number;
  total_price: number;
  order_status: OrderStatus;
  customer_id: string | null;
}

export default function OrderFormPage() {
  const { orgId } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "",
    product: "",
    quantity: 1,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderData, setOrderData] = useState<InvoiceFormData>({
    customer_name: "",
    customer_email: "",
    customer_number: "",
    product: "",
    quantity: 1,
    total_price: 0,
    order_status: OrderStatus.PLACED,
    customer_id: user?.id || null,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    orgId && fetchProducts();
  }, [orgId]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("organizationId", orgId)
      .order("name", { ascending: true });

    if (error) {
      toast({
        title: "Error fetching products",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setProducts(data);
    }
  };

  useEffect(() => {
    if (formData.product && formData.quantity) {
      const selectedProduct = products.find((p) => p.name === formData.product);
      if (selectedProduct) {
        setTotalPrice(selectedProduct.price * formData.quantity);
      }
    }
  }, [formData.product, formData.quantity, products]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, product: value }));
    setErrors((prev) => ({ ...prev, product: "" }));
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required.";
    else if (formData.phoneNumber.length < 10)
      newErrors.phoneNumber = "Phone number must be at least 10 digits.";
    else if (formData.phoneNumber.length > 10)
      newErrors.phoneNumber = "Phone number must be at most 10 digits.";
    if (!formData.product) newErrors.product = "Product selection is required.";
    if (formData.quantity < 1)
      newErrors.quantity = "Quantity must be at least 1.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0)
      return setErrors(validationErrors);
    const selectedProduct = products.find(p => p.name === formData.product);
  
    if (!selectedProduct || !selectedProduct.inStock) {
      toast({
        title: "Product Unavailable",
        description: "The selected product is out of stock.",
        variant: "destructive",
      });
      return;
    }
    const payloadForm = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_number: formData.phoneNumber,
      product: formData.product,
      quantity: formData.quantity,
      total_price: totalPrice,
      order_status: OrderStatus.PLACED,
      customer_id: user?.id || null,
      organizationId: orgId,
    };

    const { data, error } = await supabase
      .from("brown-switches-table")
      .insert(payloadForm)
      .select();

    if (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      return;
    }

    // Send new order notification
    try {
      await sendNewOrderNotification(data[0]);
    } catch (error) {
      console.error('Failed to send new order notification:', error);
      // Optionally, you can show a toast to inform the admin that the notification failed
      toast({
        title: "Notification Error",
        description: "Failed to send new order notification",
        variant: "destructive",
      });
    }

    toast({
      title: "Success",
      description: "Order placed successfully",
      variant: "default",
    });

    console.log("Form Data:", formData);
    setShowInvoice(true);
    setOrderData(payloadForm);

    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      product: "",
      quantity: 1,
    });

    setErrors({});

    router.push("/dashboard");
  };

  const copyPublicLink = () => {
    const publicLink = `${window.location.origin}/public-order-form`;
    navigator.clipboard.writeText(publicLink);
    toast({
      title: "Link Copied",
      description: "Public order form link has been copied to clipboard",
      variant: "default",
    });
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-[500px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Place an Order</CardTitle>
          {orgId && (
            <Button variant="outline" size="icon" onClick={copyPublicLink}>
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {FIELDS.map(({ id, label, ...props }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  name={id}
                  value={formData[id as keyof FormData] || ""}
                  onChange={handleChange}
                  {...props}
                />
                {errors[id as keyof FormErrors] && (
                  <p className="text-red-500">
                    {errors[id as keyof FormErrors]}
                  </p>
                )}
              </div>
            ))}
            <div className="space-y-2">
              <Label htmlFor="product">Select Switch</Label>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="md:w-full w-[180px]">
                  <SelectValue placeholder="Select the Switch" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.name}>
                      {product.name} {!product.inStock && "(Out of Stock)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.product && (
                <p className="text-red-500">{errors.product}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Total:</Label>
              <p>₹ {totalPrice} + GST</p>
            </div>
            <Button type="submit" className="w-full">
              Place Order
            </Button>
          </form>
        </CardContent>
      </Card>
      {showInvoice && (
        <Invoice orderData={orderData} onClose={() => setShowInvoice(false)} />
      )}
    </div>
  );
}

