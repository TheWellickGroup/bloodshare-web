"use client";

import { Button } from "@/components/ui/button";
import { Table, TableFooter, TableHeader } from "@/components/ui/table";
import axios from "axios";
import { Bug } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../../utils/constants";

export default function BroadCast() {
  const [reqs, setReqs] = useState([]);
  const [role, setRole] = useState("");
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const getRequests = async () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${api}/requests/me`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setReqs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRequests().catch((err) => {
      console.log(err);
    });

    const rol = localStorage.getItem("role");
    setRole(rol);

    // set location asap
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation({
          ...location,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    } else {
      console.log("Not Available");
    }
  }, []);

  return (
    <div className="container ">
      <div className="text-end">
        <Link href={"/broadcast/add"}>
          <Button className="btn hero_main_btn ">
            Announce Blood Request <i className="bi bi-arrow-right"></i>
          </Button>
        </Link>
      </div>
      <div className="table-responsive">
        <Table>
          <TableHeader>
            <TableHeader>
              <th scope="col">#</th>
              <th scope="col">Patient name</th>
              <th scope="col">Relationship</th>
              <th scope="col">Biography</th>
              <th scope="col">Blood group</th>
              <th scope="col">Blood units</th>
              <th scope="col">Donation date</th>
              <th scope="col">Diagnosis</th>
              <th scope="col">Accepted</th>
              <th scope="col">Location</th>
              <th scope="col">Action</th>
            </TableHeader>
          </TableHeader>
          <tbody>
            {reqs.length > 0 ? (
              <>
                {reqs.map((req) => (
                  <tr key={req.id}>
                    <th scope="row">*</th>
                    <td>{req.patientName}</td>
                    <td>{req.relationship}</td>
                    <td>{req.biography}</td>
                    <td>{req.bloodGroup}</td>
                    <td>{req.bloodUnits}</td>
                    <td>{moment(req.date).format("Do MMM YY")}</td>
                    <td>{req.diagnosis}</td>
                    <td>{req.accept}</td>
                    <Link
                      href={`https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${req.latitude},${req.longitude}`}
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-danger"
                      >
                        <td style={{ color: "#fc7d7b" }}>In Maps</td>
                      </a>
                    </Link>
                    <td>
                      {role == "SUPERADMIN" ? (
                        <i className="bi bi-trash"></i>
                      ) : (
                        <i className="bi bi-pencil-square"></i>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <div className="text-center">
                  <p>
                    <Bug /> no data to display
                  </p>
                </div>
              </tr>
            )}
          </tbody>
          <TableFooter>
            <tr>
              <th scope="col">#</th>
              <th scope="col">patient name</th>
              <th scope="col">relationship</th>
              <th scope="col">biography</th>
              <th scope="col">blood group</th>
              <th scope="col">blood units</th>
              <th scope="col">donation date</th>
              <th scope="col">diagnosis</th>
              <th scope="col">accepted</th>
              <th scope="col">Location</th>
              <th scope="col">Action</th>
            </tr>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
