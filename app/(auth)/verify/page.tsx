"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { api } from "../../../utils/constants";
import { getError } from "../../../utils/error";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function Verify() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [code, setCode] = React.useState("");
  const phone = "ekjrkej"

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${api}/auth/verify`, { code, phone }).then((res) => {
        if (res.status == 200) {
          localStorage.setItem("isVerified", "true");
          router.push(`/facility/add/?phone=${phone}`);
        }
      });
    } catch (err) {
      toast.error(getError(err));
      setLoading(false);
    }
  };

  return (
    <div className="container pt-5">
      <div className="">
        <div className="flex">
          <div className="p-3">
            <form onSubmit={handleVerify}>
              <br />
              <div className="form-group text-center">
                <label htmlFor="" className="form-label">
                  Enter the unique code delivered to your phoneNumber.
                </label>
                <Input
                  type="number"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="form-control"
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
                  <Button type="submit" className="btn btn-lg hero_main_btn ">
                    Verify
                  </Button>
                )}
              </div>
            </form>
            <div className="text-center alert alert-info">
              <p>
                Please get facility details like email, licences ready for next
                step.Thank You
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
