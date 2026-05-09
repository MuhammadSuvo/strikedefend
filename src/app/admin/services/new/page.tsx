import { Toolbar } from "@/components/admin/Toolbar";
import { ServiceForm } from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <div>
      <Toolbar title="New Service" />
      <ServiceForm />
    </div>
  );
}
