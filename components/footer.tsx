import { Facebook, Instagram, X } from "lucide-react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="footer pt-5">
      <div className="text-center items-center">
        <p className="lead">
          BloodShare
          <Link href={"/"}>
            <Facebook />
          </Link>{" "}
          <Link href={"/"}>
            <X />
          </Link>{" "}
          <Link href={"/"}>
            <Instagram />
          </Link>
        </p>
        <div className="mx-auto d-inline-flex">
          <Link href="/privacy">
            <p className="">Privacy Policy</p>
          </Link>
          <Link href="/terms">
            <p className="">| Terms of Service |</p>
          </Link>
        </div>
        <small>&copy; 2023. Limit Group.</small>
      </div>
    </footer>
  );
};

export default Footer;
