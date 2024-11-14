import { Session } from "next-auth";

import ProfileDropdown from "@/app/components/primitives/profile-dropdown";
import { BellOutlineIcon } from "@/public/assets/icons";
import { HamburgerIcon } from "@/public/assets/icons/hamburger";

export const DashboardNav = ({
  pathname,
  session,
  isOpen,
  setIsOpen,
}: {
  pathname: string;
  session: Session;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const width = isOpen ? "266px" : "104px";
  const path =
    pathname === "/dashboard"
      ? "Overview"
      : pathname.charAt(1).toUpperCase() + pathname.slice(2);
  return (
    <header
      className={`bg-white h-24 lg:w-[calc(100vw - ${width})] w-full px-6 lg:px-10 border-b border-grey-button-border flex items-center justify-between`}
    >
      <div className="flex items-center gap-4">
        <button
          className="block lg:hidden p-2 hover:bg-purple-quinary rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <HamburgerIcon className="w-8 h-8 text-black" />
        </button>
        <h1
          className={`hidden lg:block text-2xl text-black font-p22mackinac font-bold tracking-wide`}
        >
          {path}
        </h1>
      </div>
      <div className="flex items-center space-x-4 lg:space-x-10">
        <button className="flex items-center justify-center h-9 w-9 lg:h-[44px] lg:w-[44px] border lg:border-[1.5px] border-grey-button-border rounded-full transition-colors hover:bg-purple-quinary">
          <BellOutlineIcon />
        </button>
        <ProfileDropdown
          name={session.user.name || ""}
          email={session.user.email || ""}
          avatar={session.user.image || ""}
        />
      </div>
    </header>
  );
};
