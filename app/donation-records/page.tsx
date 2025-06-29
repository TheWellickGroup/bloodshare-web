import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Bug, Pencil, Trash } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { api } from "../../utils/constants";
import { getError } from "../../utils/error";

export default function Donations() {
  const { enqueueSnackbar } = useSnackbar();
  const [donations, setDonations] = useState([]);
  const [records, setRecords] = useState([]);

  const [role, setRole] = useState("");
  const loadData = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${api}/records`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDonations(res.data);
      })
      .catch((err) => {
        enqueueSnackbar(getError(err), { variant: "error" });
        console.log(err);
      });

    axios
      .get(`${api}/records/me`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecords(res.data);
      })
      .catch((err) => {
        enqueueSnackbar(getError(err), { variant: "error" });
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
    const rol = localStorage.getItem("role");
    setRole(rol);
  }, []);
  return (
    <div className="container">
      <div className="text-end">
        <Link href={"/donation-records/add"}>
          <Button className="btn hero_main_btn ">
            Create Record <i className="bi bi-arrow-right"></i>
          </Button>
        </Link>
      </div>
      <h3 className="text-center">Facility Blood Donation Records</h3>
      <div className="alert alert-info text-center">
        Issue the unique donation id's to the respective donors
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">#</TableHead>
            <TableHead scope="col">Name</TableHead>
            <TableHead scope="col">Phone Number</TableHead>
            <TableHead scope="col">Date of BirTableHead</TableHead>
            <TableHead scope="col">Body Weight(Kgs)</TableHead>
            <TableHead scope="col">Donation Date</TableHead>
            <TableHead scope="col">Donation ID</TableHead>
            <TableHead scope="col">Blood Units</TableHead>
            <TableHead scope="col">Created At</TableHead>
            <TableHead scope="col">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length > 0 ? (
            <>
              {records.map((req) => (
                <TableRow key={req.id}>
                  <TableHead scope="row">*</TableHead>
                  <TableCell>{req.name}</TableCell>
                  <TableCell>{req.phoneNumber}</TableCell>
                  <TableCell>{moment(req.dateOfBirth).format("Do MMM YY")}</TableCell>
                  <TableCell>{req.bodyWeight}</TableCell>
                  <TableCell>{moment(req.donationDate).format("Do MMM YY")}</TableCell>
                  <TableCell>{req.donationId}</TableCell>
                  <TableCell>{req.bloodUnits}</TableCell>
                  <TableCell>{moment(req.createdAt).format("Do MMM YY")}</TableCell>

                  <TableCell>
                    {role == "SUPERADMIN" ? (
                      <i className="bi bi-TableRowash"></i>
                    ) : (
                      <Pencil />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <div className="text-center">
                <Bug /> <p> no data to display</p>
              </div>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHead scope="col">#</TableHead>
            <TableHead scope="col">Name</TableHead>
            <TableHead scope="col">Phone Number</TableHead>
            <TableHead scope="col">Date of BirTableHead</TableHead>
            <TableHead scope="col">Body Weight</TableHead>
            <TableHead scope="col">Donation Date</TableHead>
            <TableHead scope="col">Donation ID</TableHead>
            <TableHead scope="col">Blood Units</TableHead>
            <TableHead scope="col">created At</TableHead>
            <TableHead scope="col">Action</TableHead>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="text-center">-----</div>
      {role == "SUPERADMIN" && (
        <>
          <h5 className="text-center">All Records</h5>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">#</TableHead>
                <TableHead scope="col">facility</TableHead>
                <TableHead scope="col">donation-id</TableHead>
                <TableHead scope="col">donation-date</TableHead>
                <TableHead scope="col">createdAt</TableHead>
                <TableHead scope="col">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((req) => (
                <TableRow key={req.id}>
                  <TableHead scope="row">*</TableHead>
                  <TableCell>{req.facilityr}</TableCell>
                  <TableCell>{req.donorNumber}</TableCell>
                  <TableCell>
                    {moment(req.donationDate).format("Dd MMM YY")}
                  </TableCell>
                  <TableCell>{req.createdAt}</TableCell>
                  <TableCell>
                    <Trash />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableHeader>
                <TableHead scope="col">#</TableHead>
                <TableHead scope="col">facility</TableHead>
                <TableHead scope="col">donation-id</TableHead>
                <TableHead scope="col">donation-date</TableHead>
                <TableHead scope="col">createdAt</TableHead>
                <TableHead scope="col">Action</TableHead>
              </TableHeader>
            </TableFooter>
          </Table>
        </>
      )}
    </div>
  );
}
