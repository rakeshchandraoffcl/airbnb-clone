'use client';
import React from 'react';
import { IconType } from 'react-icons';
import qs from 'query-string';
import { useSearchParams, useRouter } from 'next/navigation';

interface CategoryBoxProps {
	icon: IconType;
	label: string;
	selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
	icon: Icon,
	label,
	selected,
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const handleClick = () => {
		let currentQuery = {};
		if (searchParams) {
			currentQuery = qs.parse(searchParams.toString());
		}
		const updatedQuery: any = {
			...currentQuery,
			category: label,
		};
		if (selected) {
			delete updatedQuery.category;
		}

		const url = qs.stringifyUrl(
			{
				url: '/',
				query: updatedQuery,
			},
			{ skipNull: true }
		);
		router.push(url);
	};
	return (
		<div
			onClick={handleClick}
			className={`
            flex 
            flex-col 
            items-center 
            justify-center 
            gap-2
            p-3
            border-b-2
            hover:text-neutral-800
            transition
            cursor-pointer
            ${selected ? 'border-b-neutral-800' : 'border-transparent'}
            ${selected ? 'text-neutral-800' : 'text-neutral-500'}
            `}
		>
			<Icon size={26} />
			<div className="font-medium text-sm">{label}</div>
		</div>
	);
};

export default CategoryBox;