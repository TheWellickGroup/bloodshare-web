import Link from "next/link";
import { Button } from "./ui/button";

export default function Down() {
  return (
    <div className="container pt-5">
      <h1 className="text-center">Join us in saving lives.</h1>
      <div className="justify-content-center text-center pb-5">
        <p>A drop is enough</p>
        <small>Get our mobile app and begin a transformative journey </small>
        <br />
        <Link href={"/download"}>
          <Button className="btn hero_main_btn btn-lg">
            <i className="bi bi-google-play text-white"></i> Download App.
          </Button>
        </Link>
      </div>
    </div>
  );
}
