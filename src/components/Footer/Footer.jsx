import { VscSend } from "react-icons/vsc";
import { BiLogoPlayStore } from "react-icons/bi";
import { RiAppleLine } from "react-icons/ri";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const footerLinks = {
    support: [
      { text: "111, Ojota, Lagos", href: "#" },
      { text: "Xide@gmail.com", href: "mailto:Xide@gmail.com" },
      { text: "+2348100000000", href: "tel:+2348100000000" },
    ],
    account: [
      { text: "My Account", href: "/account" },
      { text: "Login / Register", href: "/login" },
      { text: "Cart", href: "/cart" },
      { text: "Wishlist", href: "/wishlist" },
      { text: "Shop", href: "/shop" },
    ],
    quickLink: [
      { text: "Privacy Policy", href: "/privacy-policy" },
      { text: "Terms Of Use", href: "/terms-of-use" },
      { text: "FAQ", href: "/faq" },
      { text: "Contact", href: "/contact" },
    ],
    socialMedia: [
      { icon: <FaFacebookF />, href: "#" },
      { icon: <FaTwitter />, href: "#" },
      { icon: <FaInstagram />, href: "#" },
      { icon: <FaLinkedinIn />, href: "#" },
    ],
    appStores: [
      { icon: <BiLogoPlayStore />, alt: "Google Play", href: "#" },
      { icon: <RiAppleLine />, alt: "App Store", href: "#" },
    ],
  };
  return (
    <footer className="bg-black mb-0 py-10 text-white max-sm:py-5 max-sm:px-4">
      <div className="grid mx-auto max-w-6xl grid-cols-5 gap-6 max-sm:grid-cols-2 max-sm:gap-2">
        <div className="exclu col-span-1 max-sm:order-last">
          <h2 className="font-bold mb-4 max-sm:text-center">XIDE</h2>
          <p className="mb-4 max-sm:text-center">Subscribe</p>
          <p className="mb-4 max-sm:text-center">
            Get 10% off your first order
          </p>
          <div className="flex max-sm:justify-center">
            <input
              type="text"
              placeholder="Enter your email"
              className="bg-transparent border border-white text-white px-4 py-2 rounded-l-md focus:outline-none focus:border-blue-500 w-full"
            />
            <button className="bg-white text-black px-4 py-2">
              <VscSend />
            </button>
          </div>
        </div>
        <div className="support">
          <h3 className="text-sm font-semibold mb-4 max-sm:text-center">
            Support
          </h3>
          <ul>
            {footerLinks.support.map((item, index) => (
              <li
                key={index}
                className="m-0 mb-2 w-full text-xs max-sm:text-center"
              >
                <a href={item.href}>{item.text}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="account">
          <h3 className="text-sm font-semibold mb-4 max-sm:text-center">
            Account
          </h3>
          <ul>
            {footerLinks.account.map((item, index) => (
              <li
                key={index}
                className="m-0 mb-2 w-full text-xs max-sm:text-center"
              >
                <a href={item.href}>{item.text}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="quicklink">
          <h3 className="text-sm font-semibold mb-4 max-sm:text-center">
            QuickLink
          </h3>
          <ul>
            {footerLinks.quickLink.map((item, index) => (
              <li
                key={index}
                className="m-0 mb-2 w-full text-xs max-sm:text-center"
              >
                <a href={item.href}>{item.text}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="socials">
          <h3 className="text-sm font-semibold mb-4 max-sm:text-center">
            Download App
          </h3>
          <p className="m-0 mb-2 w-full text-xs max-sm:text-center">
            Save ₦500 with App New user Only
          </p>
          <div className="flex max-sm:justify-center">
            <img src="/Qrcode 1.png" alt="QR Code" className="w-10 h-10" />
            <div className="apps">
              {footerLinks.appStores.map((store, index) => (
                <a
                  key={index}
                  href={store.href}
                  className="block max-sm:text-center"
                >
                  <img src={store.icon} alt={store.alt} className="h-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="media flex mt-4 justify-around ">
            {footerLinks.socialMedia.map((item, index) => (
              <a key={index} href={item.href}>
                {item.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="copywrite"></div>
      </div>
    </footer>
  );
};

export default Footer;
