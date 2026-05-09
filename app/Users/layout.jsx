import UserNavbar from "@/app/components/UserNavbar";

export default function UsersLayout({ children }) {
  return (
    <div className="relative min-h-screen">
      <UserNavbar />
      <main className="pt-24 min-h-screen">
        {children}
      </main>
      {/* Footer could go here too */}
    </div>
  );
}
