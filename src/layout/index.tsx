interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {/* <FancyBackground /> */}
      <div className="bg-background/50 border-muted h-[75vh] w-fit max-w-xl min-w-lg rounded-2xl border p-10 shadow-xl backdrop-blur-md">
        {children}
      </div>
    </div>
  );
};

export default Layout;
