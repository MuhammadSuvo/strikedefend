import { Toolbar } from "@/components/admin/Toolbar";
import { FaqForm } from "@/components/admin/FaqForm";

export default function NewFaqPage() {
  return (
    <div>
      <Toolbar title="New FAQ" />
      <FaqForm />
    </div>
  );
}
