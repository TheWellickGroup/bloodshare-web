import Image from "next/legacy/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function DashboardCard({ props }) {
  return (
    <div className="">
      <h2 className="text-center">Life Saving Activities</h2>
        <div className="flex flex-row items-center justify-center gap-2">
          <Card>
            <CardContent>
              <Image
                height={200}
                width={300}
                alt={"one-night-stand"}
                src={"/map.svg"}
              />
              <div className="text-center">
                <p>Donation Drives</p>
                <div className="justify-content-center text-center">
                  <Link href={"/donation"}>
                    <Button className="btn hero_main_btn">
                      Start Planning <i className="bi bi-arrow-right"></i>
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Image
                height={200}
                width={300}
                alt={"one-night-stand"}
                src={"/broadcast.svg"}
              />
              <div className="card-body text-center">
                <p>BroadCast Emergency</p>
                <div className="justify-content-center text-center">
                  <Link href={"/broadcast"}>
                    <Button className="btn hero_main_btn ">
                      Start BroadCast <i className="bi bi-arrow-right"></i>
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Image
                height={200}
                alt={"one-night-stand"}
                width={300}
                src={"/bank.svg"}
                className={"card-img-top"}
              />
              <div className="card-body text-center">
                <p>Donation Records</p>
                <div className="justify-content-center text-center">
                  <Link href={"/donation-records"}>
                    <Button className="btn hero_main_btn ">
                      Manage <i className="bi bi-arrow-right"></i>
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
    
        {props.role == "SUPERADMIN" && (
          <>
              <Card>
                <CardContent>
                  <Image
                    height={200}
                    alt={"one-night-stand"}
                    width={300}
                    src={"/people.png"}
                    className={"card-img-top"}
                  />
                  <div className="card-body text-center">
                    <p>Users</p>
                    <div className="justify-content-center text-center">
                      <Link href={"/users"}>
                        <Button className="btn hero_main_btn ">
                          Manage <i className="bi bi-arrow-right"></i>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </>
        )}
    </div>
    </div>
  );
}
