export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const response = await fetch('/api/send-mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, subject, html }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    const data = await response.json();
    console.log(`Email sent to ${to}`, data);
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendNewOrderNotification(order: any) {
  const subject = `New Order Received - Order #${order.id}`;
  const html = `
    <h1>New Order Received</h1>
    <p>Order #${order.id} has been placed.</p>
    <p>Customer: ${order.customer_name}</p>
    <p>Product: ${order.product}</p>
    <p>Quantity: ${order.quantity}</p>
    <p>Total Price: $${order.total_price.toFixed(2)}</p>
  `;
  await sendEmail(order.customer_email || '', subject, html);
}

export async function sendLowStockAlert(product: any) {
  const subject = `Low Stock Alert - ${product.name}`;
  const html = `
    <h1>Low Stock Alert</h1>
    <p>The following product is running low on stock:</p>
    <p>Product: ${product.name}</p>
    <p>Current Stock: ${product.stock}</p>
    <p>Please restock this item soon.</p>
  `;
  await sendEmail(process.env.ADMIN_EMAIL || '', subject, html);
}
