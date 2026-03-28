import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { priceId, userId } = await req.json();

    if (!priceId || !userId) {
      return NextResponse.json(
        { error: "Missing priceId or userId" }, 
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      // client_reference_id is how you identify the user in a Webhook later
      client_reference_id: userId, 
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/nutrition`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Session Error:", err.message);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}