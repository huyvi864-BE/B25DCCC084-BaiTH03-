import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/product/productsSlice';
import { ProductCard } from '../components/ProductCard';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = items.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div>
      {}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          TEI — Laptop Chính Hãng
        </h1>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm laptop theo tên..."
          className="w-full sm:w-72 px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {status === 'loading' && (
        <div className="text-center py-12 text-gray-500">Đang tải sản phẩm...</div>
      )}

      {status === 'failed' && (
        <div className="text-center py-12 text-red-500">Lỗi: {error}</div>
      )}

      {}
      {status === 'succeeded' && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 py-16 px-4 text-center">
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
                Không tìm thấy sản phẩm
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                Không có mẫu laptop nào khớp với từ khóa "{searchTerm}".
              </p>
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition"
              >
                Xem tất cả sản phẩm
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};