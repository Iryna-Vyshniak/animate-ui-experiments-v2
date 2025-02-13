const Page = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;
  console.log('name: ', name);

  return <div className='mx-auto max-w-5xl remove-scrollbar'>PLANET DETAIL</div>;
};

export default Page;
