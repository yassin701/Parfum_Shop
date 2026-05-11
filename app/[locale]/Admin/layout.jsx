"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLoginPage = pathname.endsWith("/Admin/Login");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user || null;
      setUser(currentUser);

      // REDIRECT LOGIC (PORTAL GUARD)
      if (!currentUser && !isLoginPage) {
        router.push("/Admin/Login");
      } else if (currentUser && isLoginPage) {
        router.push("/Admin/AdminCards");
      }

      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      
      if (!currentUser && !isLoginPage) {
        router.push("/Admin/Login");
      }
    });

    return () => subscription.unsubscribe();
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/Admin/Login");
    setShowLogoutModal(false);
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/Admin/AdminCards",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25a2.25 2.25 0 01-2.25 2.25h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
        </svg>
      ),
    },
    {
      name: "Add Product",
      path: "/Admin/AddProduct",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      ),
    },
    {
      name: "Orders",
      path: "/Admin/Orders",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.119-1.243l1.263-12c.056-.53.505-.933 1.037-.933h12.164c.532 0 .981.403 1.037.933Z" />
        </svg>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-6 font-sans">
        <div className="w-12 h-12 border-t-2 border-yellow-600 border-solid rounded-full animate-spin"></div>
        <div className="flex flex-col items-center">
          <p className="text-white text-[10px] font-bold tracking-[0.5em] uppercase">Arabi Studio</p>
          <p className="text-zinc-600 text-[9px] uppercase tracking-widest mt-2">Initializing Secure Session</p>
        </div>
      </div>
    );
  }

  if (isLoginPage) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-white text-zinc-900 font-sans selection:bg-gold-gradient selection:text-black">
      
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-zinc-950 flex items-center justify-between px-6 z-[100] border-b border-zinc-900">
        <h1 className="text-sm font-bold text-white tracking-widest uppercase">
          Arabi <span className="text-zinc-500 font-light">Shop</span>
        </h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-10 h-10 flex items-center justify-center text-zinc-400"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d={isMobileMenuOpen ? "M18 6 6 18M6 6l12 12" : "M3 12h18M3 6h18M3 18h18"} />
          </svg>
        </button>
      </div>

      {/* SIDEBAR OVERLAY (MOBILE) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[140] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <aside className={`
        fixed h-full bg-zinc-950 text-zinc-400 flex flex-col border-r border-zinc-800 shadow-2xl z-[150] transition-all duration-500
        w-64 lg:left-0
        ${isMobileMenuOpen ? "left-0" : "-left-64"}
      `}>
        {/* LOGO AREA */}
        <div className="p-8 hidden lg:block">
          <h1 className="text-xl font-bold text-white tracking-widest uppercase">
            Arabi <span className="text-zinc-500 font-light">Shop</span>
          </h1>
          <p className="text-[9px] text-zinc-600 mt-2 uppercase tracking-[0.4em] font-bold">Workspace Alpha</p>
        </div>

        <nav className="flex-1 px-6 space-y-3 pt-24 lg:pt-0">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 px-5 py-4 rounded-sm transition-all duration-500 group ${
                  isActive ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-200"
                }`}
              >
                <span className={`${isActive ? "text-white" : "text-zinc-700 group-hover:text-zinc-400"} transition-colors`}>
                  {item.icon}
                </span>
                <span className="text-xs uppercase tracking-widest font-bold">{item.name}</span>
                {isActive && (
                  <motion.div layoutId="activeNav" className="ml-auto w-1 h-1 rounded-full bg-white shadow-[0_0_8px_white]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* PROFILE TRIGGER */}
        <div className="p-8 border-t border-zinc-900 relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-4 group w-full"
          >
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-zinc-400 transition-all overflow-hidden relative">
               <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-10 transition-opacity"></div>
               <span className="text-xs font-serif italic text-zinc-500 group-hover:text-white transition-colors">
                {user?.email?.charAt(0).toUpperCase() || "A"}
               </span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] text-zinc-200 font-bold uppercase tracking-widest leading-none">Account</span>
              <span className="text-[9px] text-zinc-600 truncate max-w-[120px]">{user?.email || "Manager"}</span>
            </div>
          </button>

          {/* Profile Menu Dropdown */}
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-24 left-8 w-56 bg-zinc-900 border border-zinc-800 p-2 rounded-sm shadow-2xl z-[60]"
              >
                <button 
                  onClick={() => {
                    setShowLogoutModal(true);
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[10px] text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all uppercase tracking-[0.2em] font-bold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-900">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                  Terminate Session
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 lg:ml-64 bg-white min-h-screen pt-20 lg:pt-0">
        <div className="p-6 md:p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* LOGOUT CONFIRMATION MODAL */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-zinc-950 border border-zinc-900 p-10 space-y-8"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-bold text-white tracking-tight">Departure</h3>
                <div className="h-[1px] w-12 bg-gold-gradient"></div>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Are you sure you wish to terminate the current management session? Unsaved changes will be lost.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleLogout}
                  className="w-full bg-white text-black py-4 font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-red-600 hover:text-white transition-all"
                >
                  Terminate Session
                </button>
                <button 
                  onClick={() => setShowLogoutModal(false)}
                  className="w-full text-zinc-600 py-4 font-bold text-[10px] uppercase tracking-[0.4em] hover:text-zinc-200 transition-all"
                >
                  Stay in Workspace
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
