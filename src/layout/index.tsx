interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {/* <FancyBackground /> */}
      <div className="bg-background/50 border-muted h-full w-full rounded-2xl border px-5 py-10 shadow-xl md:h-[75vh] md:w-full md:max-w-xl md:min-w-lg md:p-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;
