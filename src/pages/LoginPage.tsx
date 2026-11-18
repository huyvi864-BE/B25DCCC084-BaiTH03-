import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LocationState {
  from?: { pathname: string };
}

export const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;
  const from = state?.from?.pathname || '/';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate(from, { replace: true });
    } else {
      setError('Vui lòng nhập tài khoản và mật khẩu  "123456".');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {}
      <div className="md:border-r border-gray-200 dark:border-gray-700 md:pr-6 flex items-center justify-center h-full overflow-hidden">
        <img
          src="/anh5.png" alt="Login Banner"
          onError={(e) => {
            e.currentTarget.src =
              'https://dlcdnwebimgs.asus.com/gain/f5d262ef-c27f-4a62-9759-f5bc0fc03f8c/w800';
          }}
          className="w-full h-64 object-cover rounded-xl"
        />
      </div>

      {}
      <div>
        <h1 className="text-lg font-bold mb-4">Đăng nhập Tài khoản</h1>

        {error && (
          <div className="mb-4 p-2.5 rounded bg-red-50 text-red-600 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-medium mb-1" htmlFor="username">
              Tài khoản
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên bất kỳ"
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" htmlFor="password">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu: 123456"
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#4353ff] hover:bg-blue-700 text-white font-semibold rounded transition"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};