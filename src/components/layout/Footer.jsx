import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-teal-900 text-white border-t-2 border-teal-600 shadow-md mt-6">
      <nav className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center p-6 space-y-4 md:space-y-0">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo_holidaze.png"
            alt="Holidaze Logo"
            className="w-16 rounded-lg h-auto"
          />
        </Link>
      </nav>
      <div className="text-center body-3 p-4 bg-teal-950">
        © {new Date().getFullYear()} Holidaze. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
