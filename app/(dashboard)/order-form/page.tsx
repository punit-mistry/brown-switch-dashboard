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
import { useRouter } from 'next/navigation';
import Invoice from "./Invoice";

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

const PRODUCT_PRICES = {
  "Switch - M/H": 200,
  "Switch - U/H": 300,
  "Switch - B/H": 400,
  "Switch - O/V": 600,
  "Switch - 25 Amp": 100,
  "Switch - 32 Amp": 500,
};
type ProductPrices = {
  "Switch - M/H": number;
  "Switch - U/H": number;
  "Switch - B/H": number;
  "Switch - O/V": number;
  "Switch - 25 Amp": number;
  "Switch - 32 Amp": number;
};
// const PRODUCTS = Object.keys(PRODUCT_PRICES);
const PRODUCTS: (keyof ProductPrices)[] = Object.keys(PRODUCT_PRICES);
export default function OrderFormPage() {
  const { toast } = useToast();
  const router = useRouter();
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "",
    product: "",
    quantity: 1,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderData , setOrderData] = useState<any>({});
  
  // Total price based on selected product and quantity
  const [totalPrice, setTotalPrice] = useState<number>(PRODUCT_PRICES[PRODUCTS[0]] as number);

  // Update total price when product or quantity changes
  useEffect(() => {
    const productPrice = PRODUCT_PRICES[formData.product] || 0;
    setTotalPrice(productPrice * formData.quantity);
  }, [formData.product, formData.quantity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on input
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, product: value }));
    setErrors((prev) => ({ ...prev, product: "" })); // Clear error on selection
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

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0)
      return setErrors(validationErrors);
      
    const payloadForm = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_number: formData.phoneNumber,
      product: formData.product,
      quantity: formData.quantity,
      total_price: totalPrice,
      order_status: OrderStatus.PLACED
    };

    const { error } = await supabase
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
    
    toast({
      title: "Success",
      description: "Order placed successfully",
      variant: "default",
    });
    
    console.log("Form Data:", formData);
    setShowInvoice(true); // Show the invoice after successful submission
    setOrderData(payloadForm); // Store order data for invoice
    
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      product: "",
      quantity: 1,
    });
    
    setErrors({});
    
    // router.push('/');
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-[500px]">
        <CardHeader>
          <CardTitle>Place an Order</CardTitle>
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
                  {PRODUCTS.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
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
