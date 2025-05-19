import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/components/AuthContext";
import { ShoppingCart } from "lucide-react";
import RecommendedProducts from "@/components/RecommendedProducts";
import Navbar from "@/components/Navbar";

export default function ProductCardDetail({ product }) {
    const { id } = useRouter().query;
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [productDetail, setProductDetail] = useState([]);
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
        const fetchProductDetail = async () => {
            try {
                const data = await fetchWithRetry(`https://fakestoreapi.com/products/${id}`);
                setProductDetail(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Chyba pri načítaní:", error);
                setError("Nepodarilo sa načítať produkt.");
                setIsLoading(false);
            }
        };
    
        if (id) {
            fetchProductDetail();
        }
    }, [id]);    
    

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-lg">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                <p className="mt-4">Načítavam detaily produktu...</p>
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

    return(
        <div className="min-h-screen bg-gray-100">
            <div className="h-[45px] w-full bg-[#ff4410] text-white text-center pb-2 pt-2">
                <p>Demo aplikácia pre GymBeam – 2025</p>
            </div>
            <Navbar />
            <div className="px-12">
                <div className="flex items-start justify-start">
                    <div className="w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-start justify-center py-10">
                        <div className="w-full lg:w-1/4">
                            <img 
                                src={productDetail.image} 
                                alt={productDetail.title}
                                className="w-full lg:w-auto lg:max-h-[400px] max-h-[300px] object-contain"
                            />
                        </div>
                        <div className="w-full lg:w-1/2 max-w-[70%] pt-8 text-left lg:pl-12">
                            <h2 className="lg:text-2xl text-3xl font-bold text-gray-900 mb-4">
                                {productDetail.title}
                            </h2>
                            <p className="text-gray-700 lg:text:lg text-xl mb-6">
                                {productDetail.description}
                            </p>
                            <p className="text-2xl font-bold text-[#ff4410] mb-4">
                                {productDetail.price.toFixed(2)} €
                            </p>
                            <button className="bg-[#ff4410] text-white px-16 py-3 hover:bg-[#cc3400] transition-colors flex items-center gap-2 lg:text-lg text-2xl">
                                PRIDAŤ DO KOŠÍKA
                                <ShoppingCart size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <RecommendedProducts currentProductId={id} />
        </div>
    );
}