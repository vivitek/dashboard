const Page = ({ children }) => {
  return (
    <div className="w-screen h-full dark:bg-grayBlue dark:text-white text-black font-sans">
      {children}
    </div>
  );
};

export default Page;
