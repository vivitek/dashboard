const Page = ({ children }) => {
  return (
    <div className="w-screen h-full dark:bg-black dark:text-white">
      {children}
    </div>
  );
};

export default Page;
