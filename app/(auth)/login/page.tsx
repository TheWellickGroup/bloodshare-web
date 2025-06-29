"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { api } from "../../../utils/constants";
import { getError } from "../../../utils/error";

export default function Login() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${api}/auth/login`, { phone, password }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.role);
          if (res.data.role == "USER") {
            router.push("/download");
            return;
          }
          router.push("/dashboard");
        }
      });
    } catch (err) {
      console.log(err);
      enqueueSnackbar(getError(err), { variant: "error" });
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4 bg-white">
          <h3 className="text-center">Welcome Back</h3>
          <div className="p-3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)}>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    name="mail"
                    placeholder="+2547597012.."
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    name={"password"}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="text-end">
                  <Link href="/users/forgot">
                    <small
                      className="fw-bold"
                      style={{ color: "#fc7d7b", textDecoration: "underline" }}
                    >
                      Forgot Password
                    </small>
                  </Link>
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
                    <Button type="submit" className="btn btn-lg hero_main_btn ">
                      Login
                    </Button>
                  )}
                </div>
              </form>
            </Form>

            <div className="text-center">
              <Link href={"/register"}>
                <Button className="btn btn-md hero_sec_btn ">
                  Create Facility Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
