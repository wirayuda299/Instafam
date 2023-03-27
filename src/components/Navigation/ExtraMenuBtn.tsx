import { extraListToggler } from '@/store/extraListToggler';
import { searchDrawer } from '@/store/searchDrawer';
import { FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useRecoilState } from 'recoil';

export const ExtraMenuBtn: FC = () => {
	const [extraListOpen, setExtraListOpen] = useRecoilState(extraListToggler);
	const [drawerOpen, setDrawerOpen] = useRecoilState(searchDrawer);
	
	const handleClick = () => {
		setExtraListOpen(!extraListOpen);
		setDrawerOpen(false);
	};

	return (
		<button className='hidden md:block '>
			<div
				className='flex items-center space-x-2 px-3 text-base sm:text-lg lg:mt-4 transition-all ease duration-300'
				onClick={handleClick}
			>
				{extraListOpen ? (
					<AiOutlineClose className='text-xl md:text-2xl' size={30} />
				) : (
					<RxHamburgerMenu className='text-xl md:text-2xl' size={30} />
				)}
				<span className={`${drawerOpen ? 'hidden' : 'hidden lg:block'}`}>
					More
				</span>
			</div>
		</button>
	);
};
