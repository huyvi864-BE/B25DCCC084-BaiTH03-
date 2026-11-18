import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useAppSelector } from '../app/hooks';
import { selectTotalCartQuantity } from '../features/cart/cartSlice';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const totalQuantity = useAppSelector(selectTotalCartQuantity);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm transition-colors">
      {}
      <div className="border-b border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-3 font-semibold tracking-wider">
            <span className="hover:text-red-600 cursor-pointer transition">ROG</span>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition">
              ProArt
            </span>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition">
              TEI IoT
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-5">
            <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition">
              Danh sách cửa hàng TEI
            </span>
            <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition">
              Gaming
            </span>
            <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition">
              Doanh Nghiệp
            </span>
          </div>
        </div>
      </div>

      {}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {}
          <Link
            to="/"
            className="text-2xl font-black tracking-[0.18em] text-gray-900 dark:text-white"
          >
            TEI Store
          </Link>

          {}
          <div className="flex items-center gap-5">
            {}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label="Toggle Theme"
              className="flex items-center gap-2.5 select-none"
            >
              <span
                className={`text-sm font-extrabold transition-colors ${
                  theme === 'light' ? 'text-[#23263b]' : 'text-gray-500'
                }`}
              >
                Light
              </span>

              <div
                className={`relative w-16 h-8 rounded-full p-1 transition-all duration-300 flex items-center ${
                  theme === 'light'
                    ? 'bg-gradient-to-r from-[#8b9cf7] to-[#98a9f9] shadow-inner'
                    : 'bg-[#11131f] border border-gray-700 shadow-inner'
                }`}
              >
                {theme === 'light' ? (
                  <>
                    <div className="w-6 h-6 rounded-full bg-white shadow-md" />
                    <span className="absolute right-2.5 top-2 w-1.5 h-1.5 rounded-full bg-white" />
                    <span className="absolute right-5 bottom-2.5 w-1 h-1 rounded-full bg-white/90" />
                  </>
                ) : (
                  <>
                    <span className="absolute left-2.5 top-1.5 text-[8px] text-white leading-none">
                      ★
                    </span>
                    <span className="absolute left-4 bottom-1.5 text-[7px] text-white leading-none">
                      ★
                    </span>
                    <span className="absolute left-2 bottom-2.5 w-1 h-1 rounded-full bg-white" />
                    <span className="absolute left-5 top-2.5 w-0.5 h-0.5 rounded-full bg-white" />

                    <div className="ml-auto w-6 h-6 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-5 h-5 -rotate-12"
                      >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    </div>
                  </>
                )}
              </div>

              <span
                className={`text-sm font-extrabold transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-gray-300'
                }`}
              >
                Dark
              </span>
            </button>

            {}
            <Link
              to="/cart"
              title="Giỏ hàng"
              className="relative text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.7}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <span className="absolute -top-2 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                {totalQuantity}
              </span>
            </Link>

            {}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-gray-800 dark:text-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.7}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  <span className="text-xs font-semibold">{user.username}</span>
                </div>

                <button
                  onClick={logout}
                  type="button"
                  className="text-xs font-medium text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 border border-gray-300 dark:border-gray-700 px-2.5 py-1 rounded-md transition"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                title="Đăng nhập"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.7}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="h-2 bg-[#3832c9]" />
    </header>
  );
};