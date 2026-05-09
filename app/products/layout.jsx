import UserNavbar from "@/app/components/UserNavbar";

export default function ProductsLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <UserNavbar />
      <main className="">
        {children}
      </main>
    </div>
  );
}
