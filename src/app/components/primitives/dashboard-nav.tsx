import { Session } from "next-auth";
import Avatar from "./avatar";
import { BellOutlineIcon } from "@/public/assets/icons";
import { ChevronDownIcon } from "@/public/assets/icons/chevron-down";

export const DashboardNav = ({
  pathname,
  session,
  isOpen,
}: {
  pathname: string;
  session: Session;
  isOpen: boolean;
}) => {
  const width = isOpen ? "266px" : "104px";
  const path =
    pathname === "/dashboard"
      ? "Overview"
      : pathname.charAt(1).toUpperCase() + pathname.slice(2);
  return (
    <header
      className={`bg-white h-24 w-[calc(100vw - ${width})] px-10 border-b border-grey-button-border flex items-center justify-between`}
    >
      <h1 className="text-2xl text-black font-p22mackinac font-bold tracking-wide">
        {path}
      </h1>
      <div className="flex items-center space-x-10">
        <button className="flex items-center justify-center h-[44px] w-[44px] border-[1.5px] border-grey-button-border rounded-full transition-colors hover:bg-purple-quinary">
          <BellOutlineIcon />
        </button>
        <button className="flex items-center justify-center h-[44px] space-x-3 transition-colors">
          <Avatar
            src={session.user.image!}
            alt={session.user.name || "profile image"}
          />
          <ChevronDownIcon />
        </button>
      </div>
    </header>
  );
};
