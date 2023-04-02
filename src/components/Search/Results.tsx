import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
interface Props {
	results: any[];
	handleDrawerToggler: () => void;
	setResults: Dispatch<SetStateAction<any[]>>;
	customs?: string;
}

export default function Results({
	results,
	handleDrawerToggler,
	setResults,
	customs,
}: Props) {
	
	return (
		<div
			className={`w-full h-full px-5 md:px-0 result flex justify-center bg-white text-black dark:bg-black dark:text-white transition-all ${
				results.length < 1 ? 'hidden' : 'block'
			} ${customs ? customs : ''}`}
		>
			<div className='w-full'>
				{results.map((result) => (
					<div
						className='flex mb-3 w-full justify-between border-b pb-5'
						key={result.uid}
					>
						<Link
							href={`/profile/${result.uid}`}
							onClick={handleDrawerToggler}
							className='flex space-x-3 items-center justify-center'
						>
							<Image
								src={result.image}
								width={40}
								height={40}
								priority
								className='rounded-full w-10 h-10'
								alt='profile'
							/>
							<div className='flex flex-col'>
								<p className='text-sm font-semibold'>
									{result.username}
									<span className='text-xs block'>{result.name}</span>
								</p>
							</div>
						</Link>
						<button
							type='button'
							name='close'
							title='close'
							onClick={() =>
								setResults(results.filter((user) => user.uid !== result.uid))
							}
						>
							<AiOutlineClose size={20} />
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
