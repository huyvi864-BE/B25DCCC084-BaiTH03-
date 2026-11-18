import { Outlet, Link } from 'react-router-dom';
import { Header } from '../components/Header';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {}
      <footer className="bg-[#333333] text-gray-400 text-xs mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {}
          <div>
            <h4 className="text-gray-200 font-bold uppercase tracking-widest mb-4">
              COLLECTION
            </h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition">ASUS Vivobook</Link></li>
              <li><Link to="/" className="hover:text-white transition">ASUS Zenbook</Link></li>
              <li><Link to="/" className="hover:text-white transition">ROG Gaming</Link></li>
              <li><Link to="/" className="hover:text-white transition">Accessories</Link></li>
              <li><Link to="/" className="hover:text-white transition">Sale</Link></li>
              <li><Link to="/" className="hover:text-white transition">New Arrival</Link></li>
            </ul>
          </div>

          {}
          <div>
            <h4 className="text-gray-200 font-bold uppercase tracking-widest mb-4">
              SHOP
            </h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition">About us</Link></li>
              <li><Link to="/cart" className="hover:text-white transition">Shipping Methods</Link></li>
              <li><Link to="/checkout" className="hover:text-white transition">Checkout</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Account Login</Link></li>
              <li><Link to="/" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-white transition">Support</Link></li>
            </ul>
          </div>

          {}
          <div>
            <h4 className="text-gray-200 font-bold uppercase tracking-widest mb-4">
              LATEST TWEETS
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span></span>
                <div>
                  <p className="leading-relaxed">
                    Trải nghiệm dòng Laptop ASUS Copilot+ PC mới nhất với hiệu năng AI vượt trội.
                  </p>
                  <span className="italic text-[11px] text-gray-500">1 hour ago</span>
                </div>
              </div>
              <div className="flex gap-3">
                <span></span>
                <div>
                  <p className="leading-relaxed">
                    Ưu đãi trả góp 0% và bảo hành chính hãng 2 năm quốc tế tại TEI Store.
                  </p>
                  <span className="italic text-[11px] text-gray-500">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>

          {}
          <div>
            <h4 className="text-gray-200 font-bold uppercase tracking-widest mb-4">
              TEI OFFICIAL STORE
            </h4>
            <p className="leading-relaxed mb-4">
              Hệ thống cửa hàng phân phối Laptop  chính hãng. Hỗ trợ kỹ thuật và bảo hành toàn quốc.
            </p>
            <div className="space-y-1 text-gray-300">
              <p>Hanoi, Vietnam</p>
              <p>+84 1800 6588</p>
              <p>support@shopmini.com</p>
            </div>
          </div>
        </div>

        {}
        <div className="bg-[#292929] py-4 px-4 border-t border-gray-700/50">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="tracking-wider text-[11px]">
              © COPYRIGHT STORE VIETNAM — TEI
            </span>
            <div className="flex items-center gap-4 text-sm font-black tracking-wider text-gray-300">
              <span>VISA</span>
              <span>MasterCard</span>
              <span className="italic">PayPal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};