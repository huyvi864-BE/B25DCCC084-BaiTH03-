import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCartItems,
  selectTotalCartPrice,
  selectTotalCartQuantity,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../features/cart/cartSlice';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectTotalCartQuantity);
  const totalPrice = useAppSelector(selectTotalCartPrice);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-2">Giỏ hàng của bạn đang trống</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Hãy chọn thêm sản phẩm tại cửa hàng !
        </p>
        <Link
          to="/"
          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Giỏ hàng ({totalQuantity} sản phẩm)
        </h1>
        <button
          onClick={() => dispatch(clearCart())}
          type="button"
          className="text-sm text-red-500 hover:text-red-600 font-medium"
        >
          Xoá toàn bộ giỏ hàng
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain bg-white p-1 rounded"
                />
                <div>
                  <Link
                    to={`/products/${item.id}`}
                    className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 line-clamp-1"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Đơn giá: {item.price.toLocaleString('vi-VN')} ₫
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                {}
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        updateQuantity({ id: item.id, quantity: item.quantity - 1 })
                      )
                    }
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-sm font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        updateQuantity({ id: item.id, quantity: item.quantity + 1 })
                      )
                    }
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    +
                  </button>
                </div>

                <span className="font-bold w-20 text-right">
                  {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                </span>

                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-600 text-sm font-medium"
                >
                  Xoá
                </button>
              </div>
            </div>
          ))}
        </div>

        {}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 h-fit">
          <h2 className="text-lg font-bold mb-4">Tóm tắt đơn hàng</h2>
          <div className="space-y-2 text-sm border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Tổng số lượng:</span>
              <span className="font-semibold">{totalQuantity}</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-2">
              <span>Tổng cộng:</span>
              <span className="text-blue-600 dark:text-blue-400">
                {totalPrice.toLocaleString('vi-VN')} ₫
              </span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-6 block w-full text-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
          >
            Tiến hành thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
};