const Footer = () => {
  return (
    <footer className="bg-[#faf6ee] text-[#5e5e5e] text-sm">
      <div className="max-w-8xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-[#e7e2d8]">
        
        {/* About Us */}
        <div>
          <h3 className="font-semibold text-[#2f2f2f] mb-3">About Us</h3>
          <p>Curating unique vintage pieces for the modern wardrobe.</p>
        </div>
        
        {/* Customer Care */}
        <div>
          <h3 className="font-semibold text-[#2f2f2f] mb-3">Customer Care</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#c47a56]">Shipping Info</a></li>
            <li><a href="#" className="hover:text-[#c47a56]">Returns</a></li>
            <li><a href="#" className="hover:text-[#c47a56]">Size Guide</a></li>
            <li><a href="#" className="hover:text-[#c47a56]">Contact Us</a></li>
          </ul>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-[#2f2f2f] mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#c47a56]">New Arrivals</a></li>
            <li><a href="#" className="hover:text-[#c47a56]">Shop All</a></li>
            <li><a href="#" className="hover:text-[#c47a56]">Our Story</a></li>
            <li><a href="#" className="hover:text-[#c47a56]">Blog</a></li>
          </ul>
        </div>
        
        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-[#2f2f2f] mb-3">Newsletter</h3>
          <p className="mb-3">Subscribe for vintage finds and style inspiration.</p>
          <form className="flex max-w-sm">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 border border-[#e7e2d8] rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#c47a56] text-white px-4 rounded-r-md hover:bg-[#b36a48] font-semibold"
            >
              →
            </button>
          </form>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="max-w-8xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8f8f8f]">
        <p>© 2024 Vintage Finds. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <a href="#" aria-label="Facebook" className="text-[#8f8f8f] hover:text-[#c47a56]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="#" aria-label="Twitter" className="text-[#8f8f8f] hover:text-[#c47a56]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="text-[#8f8f8f] hover:text-[#c47a56]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="#" aria-label="Pinterest" className="text-[#8f8f8f] hover:text-[#c47a56]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 12h8"></path>
              <path d="M12 8v8"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;