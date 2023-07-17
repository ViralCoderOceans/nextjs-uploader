import React from 'react'

const Navbar = () => {
	return (
		<div className='w-full z-[99] flex flex-row justify-between px-4 md:px-16 lg:px-40 bg-slate-300 text-zinc-900 transition-all'>
			<h1 className='text-lg md:text-xl lg:text-2xl px-1 lg:px-3 py-3 lg:py-6 font-semibold bg-slate-200 transition-all select-none'>
				UPLOADER
			</h1>
		</div>
	)
}

export default Navbar