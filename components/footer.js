import Link from "next/link";

const Footer = () => {
  return (
    <div className="container pb-5">
      <div className="border-t border-gray-300">
        <div className="max-w-[600px] mx-auto pt-5 flex flex-col items-center md:flex-row justify-between font-semibold">
          <Link href="/" className="border-b border-blue-500">
            Home
          </Link>
          <Link href="/about-us" className="border-b border-blue-500">
            About Us
          </Link>
          <Link href="/dashboard" className="border-b border-blue-500">
            My Account
          </Link>
          <Link
            href="/dashboard/buy-credit"
            className="border-b border-blue-500"
          >
            Buy Credit
          </Link>
          <Link href="/contact" className="border-b border-blue-500">
            Contact
          </Link>
          <Link href="/privacy" className="border-b border-blue-500">
            Privacy
          </Link>
          <Link href="/terms" className="border-b border-blue-500">
            Terms
          </Link>
          <Link href="/blog" className="border-b border-blue-500">
            Blog
          </Link>
        </div>
        <p className="text-center font-semibold text-lg pt-4">
          &copy; 2023 justbackpage.com
        </p>
      </div>
    </div>
  );
};

export default Footer;
