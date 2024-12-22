import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_EMAIL_API);

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    const { customer_email, customer_name, product, quantity, total_price } = orderData;

    const { data, error } = await resend.emails.send({
        from: "Brown Switch <onboarding@resend.dev>",
        to: customer_email,
        subject: "You have a new invoice from Brown Switch !!",
        html: `
        <h1>Invoice</h1>
        <p>Name: ${customer_name}</p>
        <p>Product: ${product}</p>
        <p>Quantity: ${quantity}</p>
        <p>Total Price: ₹${total_price}</p>
      `,
      });

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to send email' });
  }
}

