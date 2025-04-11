import { Outlet } from "react-router-dom";
import invoiceBackground from "../assets/invoice_background.webp";
import invoiceLogo from "../assets/invoice_logo.webp";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.85)), url(${invoiceBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center p-8 gap-12">
        
        {/* Left Side - Branding */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-white text-center">
          <img src={invoiceLogo} alt="Invoice App Logo" className="w-40 mb-6" />
          <h1 className="text-3xl font-bold mb-4">Simplify Your Invoicing</h1>
          <p className="text-lg text-gray-200 max-w-md">
            Create, manage, and send invoices with ease. Stay on top of your business finances in just a few clicks.
          </p>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full md:w-1/2 bg-[#1f1f1f] p-8 rounded-lg shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
