import { redirect } from 'next/navigation';

export default function Home() {
	//redirect for now since there is nothing on the home page
	redirect('/products');
	return <div className={`base_container`}>home</div>;
}
