import Link from "next/link";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/router";
import { Home, LogOut } from "lucide-react";

export default function Navbar() {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <header className={`bg-gray-100 text-black h-[45px] flex items-center px-4 sm:px-8 py-8 
            ${router.pathname === "/" ? "justify-end" : "justify-between"
            }`}
        >
            {router.pathname !== "/" && (
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold hover:underline text-lg hover:scale-[1.05] transition-transform duration-300"
                >
                    <Home size={22} />
                    Na hlavnú
                </Link>
            )}
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-lg font-bold hover:underline hover:scale-[1.05] transition-transform duration-300"
            >
                Odhlásiť sa <LogOut size={22} />
            </button>
        </header>
    );
}
