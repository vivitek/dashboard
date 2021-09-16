const LoadingPage = () => {
  return (
    <div className="w-full h-screen fixed block z-50 top-0 right-0 left-0 bottom-0 overflow-hidden" style={{ background: "rgba(0,0,0,0.85)" }}>
      <div className="flex flex-col justify-center items-center h-full w-full">
        <h1>Loading stuff...</h1>
      </div>
    </div>
  );
};

export default LoadingPage;
