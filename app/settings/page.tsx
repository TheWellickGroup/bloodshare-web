"use client"
import axios from "axios";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "../../utils/constants";
import { getError } from "../../utils/error";

export default function Settings() {
  const [profile, setProfile] = useState<{
    avatar: string;
    email: string;
    name: string;
    bloodType: string;
    gender: string;
    dateOfBirth: string;
    bloodPoints: number
  }>(null);
  const [facility, setFacility] = useState<{
    name: string
    email: string
    licenseNumber: string
    city: string
    country: string
    mission: string
    avatar: string
    logo: string
  }>(null);
  const base = process.env.BASE;

  const getProfile = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${api}/auth/profiles`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        toast.error(getError(err));
      });

    axios
      .get(`${api}/auth/facility`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFacility(res.data);
      })
      .catch((err) => {
        toast.error(getError(err));
      });
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div className=" pt-3">
      <div className="p-3">
        <div className="row">
          <div className="offset-md-1">
            <div className="">
              <div className="flex flex-row">
                <h3 className="text-center">Personal Profile</h3>
                <div className="card">
                  {profile ? (
                    <>
                      {profile.avatar && (
                        <Image
                          src={`${base}/avatars/${profile.avatar}`}
                          alt="profile"
                          width={100}
                          height={150}
                        />
                      )}

                      <div className="card-body">
                        <h5>{profile.name}</h5>
                        <hr />
                        <p>{profile.email}</p>
                        <p>{profile.bloodType}</p>
                        <p>{profile.gender}</p>
                        <p>{profile.dateOfBirth}</p>
                        <p>{profile.bloodPoints} Life saver points.</p>
                      </div>
                    </>
                  ) : (
                    <div className="p-5">
                      <Link href="/users/edit">
                        <button className="btn hero_main_btn ">
                          Complete your profile{" "}
                          <i className="bi bi-arrow-right"></i>
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12">
                <h3 className="text-center">Organization Profile</h3>
                <div className="card">
                  {facility && facility.logo && (
                    <Image
                      src={`${base}/avatars/${facility.avatar}`}
                      alt="profile"
                      width={100}
                      height={150}

                      // style={{ borderRadius: 50, padding: 30 }}
                      // className="card-img-top"
                    />
                  )}

                  <div className="card-body">
                    {facility ? (
                      <>
                        <h5>{facility.name}</h5>
                        <hr />
                        <p>Email: {facility.email}</p>
                        <p>License: {facility.licenseNumber}</p>
                        <p>Our Mission: {facility.mission}</p>
                        <p>{facility.city}</p>
                        <p>{facility.country}</p>
                      </>
                    ) : (
                      <div className="text-center">
                        <div className="alert alert-danger">
                          Keep facility info upto date
                        </div>
                        <Link href={"/facility/add"}>
                            Update Facility Profile{" "}
                            <i className="bi bi-plus-circle"></i>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
