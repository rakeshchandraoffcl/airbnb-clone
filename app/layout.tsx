import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar/Navbar';
import Modal from './components/modals/Modal';

export const metadata = {
	title: 'Airbnb',
	description: 'Airbnb clone',
};

const font = Nunito({
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={font.className}>
				<Navbar />
				<Modal actionLabel={'submit'} title="Demo Modal" isOpen />
				{children}
			</body>
		</html>
	);
}
