import Link from "next/link";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="pt-5">
      <div className="container ">
        <div className="row">
          <h1 className="text-center">Begin a life-saving journey</h1>
          <div className="col-md-4 offset-md-4 bg-white">
            <div className="justify-content-center text-center">
              <br />
              <div className=" d-flex justify-content-center space-between">
                <Link href={"/register"}>
                  <Button>Join</Button>
                </Link>
                <Link href={"/login"}>
                  <Button>sign in</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center pt-5">
            <p className="lead">
              Join 100+ Health facilities using our service to improve how they
              handle blood donations.
            </p>
            <p>Try the free service today.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
