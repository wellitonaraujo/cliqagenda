export default function NoSidebarLayout({ children }: { children: React.ReactNode }) {
    return (
       <div className="flex h-full">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <main>{children}</main>
        </div>
      </div>
    );
  }
  