import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-extrabold text-blue-600 dark:text-blue-400">404</h1>
      <p className="mt-4 text-xl font-semibold">Không tìm thấy trang yêu cầu</p>
      <p className="mt-2 text-gray-500 dark:text-gray-400 mb-6">
        Đường dẫn bạn truy cập không tồn tại.
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        Về trang chủ
      </Link>
    </div>
  );
};