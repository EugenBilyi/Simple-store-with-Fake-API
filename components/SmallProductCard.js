import Link from "next/link";

export default function SmallProductCard({ product }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 min-w-[180px] max-w-[200px] flex flex-col justify-between">
            <img
                src={product.image}
                alt={product.title}
                className="h-32 object-contain mb-4 mx-auto"
            />
            <h3 className="lg:text-md text-lg font-medium text-gray-800 mb-2 line-clamp-2">
                {product.title}
            </h3>
            <p className="text-[#ff4410] lg:text-md text-lg font-semibold mb-3">
                {product.price.toFixed(2)} €
            </p>
            <Link href={`/product/${product.id}`}>
                <button className="bg-[#ff4410] text-white lg:text-md text-lg py-2 w-full rounded hover:bg-[#cc3400] transition-colors">
                    Detaily
                </button>
            </Link>
        </div>
    );
}
