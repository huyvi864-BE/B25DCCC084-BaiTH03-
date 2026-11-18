import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/product/productsSlice';
import { addToCart } from '../features/cart/cartSlice';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const product = items.find((item) => item.id === Number(id));

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="text-center py-16 text-gray-500 dark:text-gray-400">
        Đang tải thông tin sản phẩm...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-bold mb-4">Không tìm thấy sản phẩm</h2>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <Link
        to="/"
        className="inline-block mb-6 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
      >
        ← Quay lại danh sách
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="bg-white p-6 rounded-xl flex items-center justify-center h-80 md:h-96">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
            {product.category}
          </span>
          <h1 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {product.title}
          </h1>
          <p className="mt-4 text-3xl font-extrabold text-orange-600 dark:text-orange-400">
            {product.price.toLocaleString('vi-VN')} ₫
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => dispatch(addToCart(product))}
              type="button"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-sm"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};