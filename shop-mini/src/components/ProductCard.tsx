import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition">
      <div>
        {}
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-0.5 text-[11px] font-bold text-orange-600 border border-orange-500 rounded">
            Deal
          </span>
          <span className="px-2 py-0.5 text-[11px] font-medium bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-300 rounded">
            Trả góp 0%
          </span>
        </div>

        {}
        <Link to={`/products/${product.id}`} className="block group">
          <div className="h-44 w-full flex items-center justify-center bg-white rounded-lg p-3 mb-3">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
            />
          </div>

          <span className="text-[11px] font-semibold uppercase text-blue-600 dark:text-blue-400">
            {product.category}
          </span>
          <h3 className="mt-1 text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600">
            {product.title}
          </h3>
        </Link>

        {}
        <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
          <p className="text-[11px] text-gray-400">Giá trên ASUS estore</p>
          <p className="text-lg font-extrabold text-orange-600 dark:text-orange-400">
            {product.price.toLocaleString('vi-VN')} ₫
          </p>
        </div>

        {}
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
          {product.description}
        </p>
      </div>

      {}
      <button
        onClick={() => dispatch(addToCart(product))}
        type="button"
        className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition"
      >
        + Thêm vào giỏ hàng
      </button>
    </div>
  );
};