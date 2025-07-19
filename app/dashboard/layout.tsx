import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Fixed width sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      
      {/* Scrollable main content area */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}