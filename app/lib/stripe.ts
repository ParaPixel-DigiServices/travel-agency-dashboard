import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "mock_stripe_key",
  {
    apiVersion: "2025-01-27.acacia",
  },
);

export const createProduct = async (
  name: string,
  description: string,
  images: string[],
  price: number,
  tripId: string,
) => {
  const product = await stripe.products.create({
    name,
    description,
    images,
  });

  const priceObject = await stripe.prices.create({
    product: product.id,
    unit_amount: price * 100,
    currency: "usd",
  });

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [{ price: priceObject.id, quantity: 1 }],
    metadata: { tripId },
    after_completion: {
      type: "redirect",
      redirect: {
        url: `${process.env.VITE_BASE_URL}/travel/${tripId}/success`,
      },
    },
  });

  return paymentLink;
};
