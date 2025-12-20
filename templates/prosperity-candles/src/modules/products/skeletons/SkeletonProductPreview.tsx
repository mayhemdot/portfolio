const SkeletonProductPreview = () => {
	return (
		<div className='animate-pulse'>
			<div className='aspect-9/16 bg-ui-bg-subtle w-full' />
			<div className='text-base-regular mt-2 flex justify-between'>
				<div className='h-6 w-2/5 '></div>
				<div className='h-6 w-1/5 '></div>
			</div>
		</div>
	);
};

export default SkeletonProductPreview;
