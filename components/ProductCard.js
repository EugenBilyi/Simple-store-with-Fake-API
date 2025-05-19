import Link from "next/link";

export default function ProductCard({ product }) {
    return (
        <div className="bg-white w-[90%] mx-auto rounded-lg shadow-md p-4 flex flex-col justify-between">
            <img
                src={product.image}
                alt={product.title}
                className="h-40 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {product.title}
            </h2>
            <p className="text-[#ff4410] font-bold text-xl mb-2">
                {product.price.toFixed(2)} €
            </p>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {product.description}
            </p>
            <Link href={`/product/${product.id}`}>
                <button className="mt-auto bg-[#ff4410] text-white py-2 px-4 rounded hover:bg-[#cc3400] transition-colors duration-[500ms] w-full">
                    Detaily
                </button>
            </Link>
        </div>
    );
  }
  