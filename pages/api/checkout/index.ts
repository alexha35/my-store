import Stripe from 'stripe';
import type { NextApiRequest, NextApiResponse } from 'next';

import { Product } from '@/types/product';
import { CartProduct } from '@/types/cart';

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
	apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const productFetch = await fetch('https://fakestoreapi.com/products');
	const products: Product[] = await productFetch.json();
	const cartItems: CartProduct[] = req.body.products;

	if (!cartItems) return res.status(400).send('Empty cart.');

	const totalAmount: number = cartItems.reduce((sum, curr) => Number(products.find((item) => item.id === curr.id)?.price) * Number(curr.quantity) + sum, 0) * 100;

	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: totalAmount,
			currency: 'usd',
			automatic_payment_methods: {
				enabled: false,
			},
		});

		res.status(200).json({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (e) {
		console.error(e);
		res.status(400).json({ error: e });
	}
}
