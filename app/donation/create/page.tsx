import { useRouter } from "next/navigation";
import DriveForm from "../../../components/driveForm";

export default function AddDonation() {
  const router = useRouter();
  return (
    <div>
      <DriveForm />
    </div>
  );
}
