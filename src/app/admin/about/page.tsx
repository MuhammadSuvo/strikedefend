import { getAboutContent } from "@/lib/about";
import { Toolbar } from "@/components/admin/Toolbar";
import { AboutForm } from "@/components/admin/AboutForm";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const about = await getAboutContent();
  return (
    <div className="max-w-3xl">
      <Toolbar
        title="About Page"
        description="Edit every section on the public /about page. Add, change, or remove content anytime."
      />
      <AboutForm initial={about} />
    </div>
  );
}
