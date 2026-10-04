import { Plus } from "lucide-react";

export default function DetailIndicator() {
  return (
    <span className="detail-indicator" aria-hidden="true">
      <Plus size={18} strokeWidth={1.8} />
    </span>
  );
}
