"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { api } from "../../../utils/constants";
import { getError } from "../../../utils/error";
import { Input } from "@/components/ui/input";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("+2547");
  const role = "FACILITYADMIN";
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!role || !password || !phone) {
      setLoading(false);
      toast.error("All fields are required", { description: "error" });
      return;
    }
    try {
      await axios
        .post(`${api}/auth/signup`, { phone, password, role })
        .then((res) => {
          if (res.status == 201) {
            localStorage.setItem("isVerified", "false");
            router.push(`/verify?phone=${phone}`);
          }
        });
    } catch (err) {
      console.log(err);
      toast.error(getError(err), { description: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      <div className="">
        <div className=" bg-white">
          <div className="p-3">
            <form onSubmit={handleRegister}>
              <div>
                <label htmlFor="" className="form-label">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={phone}
                  placeholder="+2547.."
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <label htmlFor="" className="form-label">
                  Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <label htmlFor="" className="form-label">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <br />
              <div className="text-center pb-4">
                {loading ? (
                  <>
                    <div className="spinner-border text-danger" role="status">
                      <span className="sr-only"></span>
                    </div>
                  </>
                ) : (
                  <Button type="submit">
                    Register
                  </Button>
                )}
              </div>
            </form>
            <div className="text-center">
              <p>
                Have an account?{" "}
                <p className="link">
                  <Link href={"/login"}>Login</Link>
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
