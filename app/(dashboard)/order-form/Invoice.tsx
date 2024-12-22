import React from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

interface InvoiceProps {
  orderData: any;
  onClose: () => void;
}


const Invoice = ({ orderData, onClose }: InvoiceProps) => {
  const { customer_name, customer_email, customer_number, product, quantity, total_price } = orderData;
    const router = useRouter();
  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text('Invoice', 20, 20);
    pdf.text(`Name: ${customer_name}`, 20, 30);
    pdf.text(`Email: ${customer_email}`, 20, 40);
    pdf.text(`Phone Number: ${customer_number}`, 20, 50);
    pdf.text(`Product: ${product}`, 20, 60);
    pdf.text(`Quantity: ${quantity}`, 20, 70);
    pdf.text(`Total Price: ₹${total_price}`, 20, 80);
    pdf.save('invoice.pdf');
  };

  const handleEmailInvoice = async () => {
    // Implement your email sending logic here using Resend or any other service
    // Make sure to include the invoice URL if needed
    try {
        const response = await fetch('/api/send-invoice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
  
        if (response.ok) {
            console.log('Email sent successfully', response);
            router.push('/order');
        } else {
          throw new Error('Failed to send email');
        }
      } catch (error) {
        // setEmailError('Failed to send email. Please try again.');
      }

    
    // await sendEmail(orderData);
    //   console.log("Email result:", emailResult);
    // Example API call to send email
  };

  return (
    <div className="invoice">
      <h2>Invoice Details</h2>
      <p>Name: {customer_name}</p>
      <p>Email: {customer_email}</p>
      <p>Phone Number: {customer_number}</p>
      <p>Product: {product}</p>
      <p>Quantity: {quantity}</p>
      <p>Total Price: ₹{total_price}</p>
      <Button onClick={handleDownloadPDF}>Download Invoice</Button>
      <Button onClick={handleEmailInvoice}>Email Invoice</Button>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
};

export default Invoice;
