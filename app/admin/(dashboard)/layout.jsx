import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="min-h-screen flex-1 overflow-x-hidden">{children}</div>
    </div>
  );
}
