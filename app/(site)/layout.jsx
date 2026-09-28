import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/getSettings";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }) {
  const settings = await getSettings();

  return (
    <>
      <Header settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
