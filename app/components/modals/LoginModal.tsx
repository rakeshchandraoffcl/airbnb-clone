'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
	const router = useRouter();
	const registermodal = useRegisterModal();
	const loginmodal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			setIsLoading(true);
			const result = await signIn('credentials', {
				...data,
			});
			if (result?.ok) {
				toast.success('Successfully logged in');
				router.refresh();
				loginmodal.onClose();
			}
			if (result?.error) {
				toast.error(result?.error);
			}
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong...');
		} finally {
			setIsLoading(false);
		}
	};

	const onCreateAccount = () => {
		loginmodal.onClose();
		registermodal.onOpen();
	};

	const bodyContent: React.ReactNode = (
		<div className="flex flex-col gap-4">
			<Heading
				title="Welcome back"
				subTitle="Please login to continue"
				center
			/>
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>

			<Input
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);
	const footerContent: React.ReactNode = (
		<div className="flex flex-col gap-2 mt-2">
			<hr />
			<Button
				label="Continue with google"
				onClick={() => {
					signIn('google');
				}}
				outline
				icon={FcGoogle}
			/>
			<Button
				label="Continue with github"
				onClick={() => {
					signIn('github');
				}}
				outline
				icon={AiFillGithub}
			/>
			<div className="flex flex-row justify-center items-center gap-2">
				<div>First time to airbnb ?</div>
				<div
					onClick={onCreateAccount}
					className="text-neutral-500 cursor-pointer hover:underline"
				>
					create an account
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginmodal.isOpen}
			title="Login"
			actionLabel="Continue"
			onClose={loginmodal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;
