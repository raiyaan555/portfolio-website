import { redirect } from "next/navigation";
import { routes } from "@/lib/paths";

export default function PhilosophyPage() {
  redirect(routes.home);
}
