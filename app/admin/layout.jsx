export const metadata = {
  title: "Admin Panel",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="min-h-screen bg-bg">{children}</div>;
}
