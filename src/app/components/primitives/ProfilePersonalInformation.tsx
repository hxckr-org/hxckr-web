import { PencilIcon } from "@/public/assets/icons/pencil";
import Image from "next/image";

const PersonalInformation = ({
  name,
  email,
  picture,
}: {
  name: string;
  email: string;
  picture: string;
}) => (
  <div className="bg-white rounded-lg border border-[#DBE2E8]">
    <div className="flex justify-between items-center p-6 bg-[#F5F5F5] rounded-t-lg">
      <h2 className="text-xl font-semibold text-[#313233]">
        Personal Information
      </h2>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-4">
        <Image
          src={picture}
          alt="Profile"
          width={64}
          height={64}
          className="rounded-full"
        />
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-[#313233]">{name}</h3>
          <p className="text-[#5A5A5A]">{email}</p>
          <p className="text-[#5A5A5A]">
            Role: <b>User</b>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default PersonalInformation;
