import type { Metadata } from "next";
import AdminPanel from "../components/AdminPanel";

export const metadata: Metadata = {
  title: "Guestbook moderation",
  robots: { index: false, follow: false },
};

export default function AdminRoute() {
  return <AdminPanel />;
}
