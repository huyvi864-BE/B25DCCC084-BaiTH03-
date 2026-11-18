import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCartItems,
  selectTotalCartPrice,
  selectTotalCartQuantity,
  clearCart,
} from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';

export const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const cartItems = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectTotalCartQuantity);
  const totalPrice = useAppSelector(selectTotalCartPrice);

  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    setOrderSuccess(true);
  };

  if (orderSuccess) {
    return (
      <div className="max-w-lg mx-auto text-center py-12 px-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl">
        <div className="text-4xl mb-3">🎉</div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
          Đặt hàng thành công!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Cảm ơn <strong>{user?.username}</strong> đã mua sắm tại TEI. Đơn hàng của bạn đang được xử lý.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-6">Xác nhận Thanh toán</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Chưa có sản phẩm nào để thanh toán.
          </p>
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Quay lại cửa hàng
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 text-sm">
            <p>
              Người nhận: <strong>{user?.username}</strong>
            </p>
            <p className="mt-1">
              Tổng số lượng sản phẩm: <strong>{totalQuantity}</strong>
            </p>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="py-3 flex justify-between items-center text-sm">
                <span className="line-clamp-1 pr-4">
                  {item.title} <strong>x{item.quantity}</strong>
                </span>
                <span className="font-semibold shrink-0">
                  {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
            <span>Tổng thanh toán:</span>
            <span className="text-blue-600 dark:text-blue-400">
             {totalPrice.toLocaleString('vi-VN')} ₫
            </span>
          </div>

          <button
            onClick={handlePlaceOrder}
            type="button"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
          >
            Đặt hàng
          </button>
        </>
      )}
    </div>
  );
};