import { useEffect, useState } from "react";
import SmallProductCard from "./SmallProductCard";

export default function RecommendedProducts({ currentProductId }) {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);

    const PRODUCTS_PER_PAGE = 6;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();

                // Фільтруємо поточний товар
                const filtered = data.filter((product) => product.id !== parseInt(currentProductId));
                setProducts(filtered.slice(0, 12));
            } catch (error) {
                console.error("Chyba pri načítaní odporúčaných produktov:", error);
            }
        };

        fetchProducts();
    }, [currentProductId]);

    const startIndex = page * PRODUCTS_PER_PAGE;
    const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

    const hasNext = startIndex + PRODUCTS_PER_PAGE < products.length;
    const hasPrev = page > 0;

    return (
        <div className="mt-12 pb-12 pl-6 pr-4">
            <p className="font-bold lg:text-[1.3rem] text-[1.5rem] mb-4">Zákazníci si tiež dokúpili</p>

            {/* PC режим з пагінацією */}
            <div className="hidden lg:flex items-center gap-4 relative">
                {hasPrev && (
                    <button
                        onClick={() => setPage((p) => p - 1)}
                        className="absolute left-[-32px] z-10 bg-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#444] transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 26 24" width="40" height="40">
                            <path d="M15 6l-6 6 6 6" />
                        </svg>
                    </button>                
                )}

                <div className="grid grid-cols-3 xl:grid-cols-6 gap-1 w-full">
                    {currentProducts.map((product) => (
                        <SmallProductCard key={product.id} product={product} />
                    ))}
                </div>

                {hasNext && (
                    <button
                        onClick={() => setPage((p) => p + 1)}
                        className="absolute right-[10px] z-10 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 22 24" width="40" height="40">
                            <path d="M9 6l6 6-6 6" />
                        </svg>
                    </button>                
                )}
            </div>

            {/* Mobile + tablet: горизонтальна прокрутка */}
            <div className="flex overflow-x-auto scrollbar-hide lg:hidden">
                {products.map((product, index) => (
                    <div key={product.id} className={`pr-4 ${index === products.length - 1 ? "pr-0" : ""}`}>
                        <SmallProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}
