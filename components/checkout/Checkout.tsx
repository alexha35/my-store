import { useState, useEffect } from 'react';
import { PaymentElement, LinkAuthenticationElement, useStripe, useElements, AddressElement } from '@stripe/react-stripe-js';
import { useSetAtom, useAtomValue } from 'jotai';

import styles from './checkout.module.css';
import { clearCart } from '@/atoms/cart.atom';

export default function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [_, setEmail] = useState<string>('');
	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const clearCartAtom = useSetAtom(clearCart);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent?.status) {
				case 'succeeded':
					clearCartAtom();
					setMessage('Payment succeeded!');
					break;
				case 'processing':
					setMessage('Your payment is processing.');
					break;
				case 'requires_payment_method':
					setMessage('Your payment was not successful, please try again.');
					break;
				default:
					setMessage('Something went wrong.');
					break;
			}
		});
	}, []);

	const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: 'http://localhost:3000/thankyou',
			},
		});

		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message || 'Error processing payment');
		} else {
			setMessage('An unexpected error occurred.');
		}

		setIsLoading(false);
	};

	return (
		<>
			<form id='payment-form' onSubmit={handleSubmit} className={styles.form_container}>
				<AddressElement options={{ mode: 'shipping' }} />
				<LinkAuthenticationElement id='link-authentication-element' onChange={(e) => setEmail((e as any).target.value)} />
				<PaymentElement
					id='payment-element'
					options={{
						layout: 'tabs',
					}}
				/>
				<button disabled={isLoading || !stripe || !elements} id='submit' className={`${styles.button} primary-cta`}>
					<span id='button-text'>{isLoading ? 'Confirming' : 'Pay now'}</span>
				</button>
				{message && <div id='payment-message'>{message}</div>}
			</form>
		</>
	);
}
