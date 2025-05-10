const FancyBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      {/* 背景流动彩色光圈 */}
      <div className="absolute top-[-10%] left-[-10%] h-[30rem] w-[30rem] animate-pulse rounded-full bg-pink-400 opacity-30 mix-blend-screen blur-3xl" />
      <div className="absolute top-[50%] left-[60%] h-[20rem] w-[20rem] animate-ping rounded-full bg-blue-400 opacity-30 mix-blend-screen blur-2xl" />
      <div className="absolute right-[10%] bottom-[10%] h-[25rem] w-[25rem] animate-bounce rounded-full bg-purple-500 opacity-40 mix-blend-screen blur-2xl" />
    </div>
  );
};

export default FancyBackground;
