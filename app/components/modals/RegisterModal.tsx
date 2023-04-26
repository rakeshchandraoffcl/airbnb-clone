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
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
	const registermodal = useRegisterModal();
	const loginmodal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			setIsLoading(true);
			await axios.post('/api/register', data);
			registermodal.onClose();
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong...');
		} finally {
			setIsLoading(false);
		}
	};

	const onLogin = () => {
		registermodal.onClose();
		loginmodal.onOpen();
	};

	const bodyContent: React.ReactNode = (
		<div className="flex flex-col gap-4">
			<Heading
				title="Welcome to Airbnb"
				subTitle="Create an account"
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
				id="name"
				label="Name"
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
				<div>Already have an account ?</div>
				<div
					onClick={onLogin}
					className="text-neutral-500 cursor-pointer hover:underline"
				>
					Login
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={registermodal.isOpen}
			title="Register"
			actionLabel="Continue"
			onClose={registermodal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;
