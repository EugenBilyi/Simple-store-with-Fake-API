import { useAuth } from "@/components/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";

export default function Home() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWithRetry = async (url, attempts = 3) => {
        for (let i = 0; i < attempts; i++) {
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return await res.json();
            } catch (err) {
                console.warn(`Fetch failed (${i + 1}/${attempts}): ${url}`, err);
                if (i === attempts - 1) throw err;
            }
        }
    };    

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if(isAuthenticated){
            let isMounted = true;
    
            const fetchProducts = async () => {
                try {
                    const data = await fetchWithRetry("https://fakestoreapi.com/products");
                    if (isMounted) {
                        setProducts(data);
                        setIsLoading(false);
                    }
                } catch (err) {
                    if (isMounted) {
                        console.error("Chyba pri načítaní:", err);
                        setError("Nepodarilo sa načítať produkty.");
                        setIsLoading(false);
                    }
                }
            };
    
            fetchProducts();
    
            return () => { isMounted = false };
        }
    }, [isAuthenticated]);    

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-lg">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                <p className="mt-4">Načítavam produkty...</p>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center text-lg px-4">
                <p className="text-red-600">{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 px-5 py-2 bg-[#ff4410] text-white rounded hover:bg-[#e63d0c] transition"
                >
                    Skúsiť znova
                </button>
            </div>
        );
    }    

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen  flex flex-col bg-gray-100">
            <div className="h-[45px] w-full bg-[#ff4410] text-white text-center pb-2 pt-2">
                <p>
                    Demo aplikácia pre GymBeam – 2025
                </p>
            </div>
            <Navbar />
            <div className="w-full flex justify-center">
                <input 
                    type="text" 
                    id="searchBar"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Hľadajte v obchode..."
                    className="md:w-[30%] w-[60%] border-[3px] border-black rounded-none outline-none py-[4px] px-[8px]"
                />
                <button className="flex h-[37px] w-[37px] bg-black cursor-default">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="683.8 197.5 33 28" 
                        fill="white" 
                        aria-label="Search" 
                        className="w-7 h-7 m-1">
                            <path d="m717.1 223.8-13.3-10c.9-1.6 1.5-3.4 1.5-5.3v-.2c0-2.9-1.2-5.6-3.1-7.6-1.9-2-4.6-3.2-7.5-3.2h-.2c-2.9 0-5.6 1.2-7.6 3.1-2 1.9-3.2 4.6-3.2 7.5v.2c0 2.9 1.2 5.6 3.1 7.6 1.9 2 4.6 3.2 7.5 3.2h.2c2.9 0 5.6-1.2 7.6-3.1.2-.2.3-.3.4-.5l13.3 10 1.3-1.7zm-22.5-6.9h-.1c-2.4 0-4.5-1-6-2.6s-2.5-3.7-2.5-6v-.1c0-2.4 1-4.5 2.6-6s3.7-2.5 6-2.5h.1c2.4 0 4.5 1 6 2.6s2.5 3.7 2.5 6v.1c0 1.8-.6 3.6-1.6 4.9l-.2.2c-.2.3-.5.6-.7.8-1.7 1.7-3.8 2.6-6.1 2.6z"></path>
                    </svg>
                </button>
            </div>
            <div className="flex items-center justify-center py-6 px-4">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center text-lg">
                        Žiadne výsledky pre „{search}“
                    </p>
                )}
            </div>
        </div>
    );
}
