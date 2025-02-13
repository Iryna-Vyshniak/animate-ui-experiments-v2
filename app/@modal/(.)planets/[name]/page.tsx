const Page = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;
  console.log(name);

  return <div>Will be Modal</div>;
};

export default Page;
