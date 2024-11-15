"use client";

import Link from "next/link";

import {
  BellOutlineIcon,
  BellSolidIcon,
  DoubleChevronLeft,
  JedeIcon,
  LogoutIcon,
  OverviewOutlineIcon,
  OverviewSolidIcon,
  PuzzlePieceOutlineIcon,
  PuzzlePieceSolidIcon,
  TrophyOutlineIcon,
  TrophySolidIcon,
  UserOutlineIcon,
  UserSolidIcon,
} from "@/public/assets/icons";
import { signOut } from "next-auth/react";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
}

const NavItem = ({
  href,
  icon,
  label,
  isActive,
  isOpen,
  onClick,
}: NavItemProps) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`flex items-center mx-6 my-8 px-6 py-4 text-gray-600 transition-colors hover:bg-purple-quinary hover:text-purple-primary ${
          isOpen &&
          "hover:rounded-r-full hover:border-r-4 hover:border-purple-primary gap-3"
        }
      ${
        isActive && isOpen
          ? "bg-purple-quinary text-purple-primary border-r-4 border-purple-primary rounded-r-full"
          : ""
      } ${!isOpen ? "justify-center" : ""}`}
      >
        <span className="w-5 h-5 text-purple-primary">{icon}</span>
        <span className="text-base leading-3 font-normal">{label}</span>
      </button>
    );
  }
  return (
    <Link
      href={href}
      className={`flex items-center mx-6 my-8 px-6 py-4 text-gray-600 transition-colors hover:bg-purple-quinary hover:text-purple-primary ${
        isOpen &&
        "hover:rounded-r-full hover:border-r-4 hover:border-purple-primary gap-3"
      } ${
        isActive && isOpen
          ? "bg-purple-quinary text-purple-primary border-r-4 border-purple-primary rounded-r-full"
          : ""
      } ${!isOpen ? "justify-center" : ""}`}
    >
      <span className="w-5 h-5 text-purple-primary">{icon}</span>
      <span className="text-base leading-3 font-normal">{label}</span>
    </Link>
  );
};

export default function Sidebar({
  isOpen,
  setIsOpen,
  pathname,
  isHamburgerOpen,
  setIsHamburgerOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  pathname: string;
  isHamburgerOpen: boolean;
  setIsHamburgerOpen: (isHamburgerOpen: boolean) => void;
}) {
  const navItems = [
    {
      href: "/dashboard",
      icon: pathname.toLowerCase().startsWith("/dashboard") ? (
        <OverviewSolidIcon className={`w-5 h-5`} />
      ) : (
        <OverviewOutlineIcon className={`w-5 h-5`} />
      ),
      label: "Overview",
    },
    {
      href: "/challenges",
      icon: pathname.toLowerCase().startsWith("/challenges") ? (
        <PuzzlePieceSolidIcon className={`w-5 h-5`} />
      ) : (
        <PuzzlePieceOutlineIcon className={`w-5 h-5`} />
      ),
      label: "Challenges",
    },
    {
      href: "/leaderboard",
      icon: pathname.toLowerCase().startsWith("/leaderboard") ? (
        <TrophySolidIcon className={`w-5 h-5`} />
      ) : (
        <TrophyOutlineIcon className={`w-5 h-5`} />
      ),
      label: "Leaderboard",
    },
    {
      href: "/notifications",
      icon: pathname.toLowerCase().startsWith("/notifications") ? (
        <BellSolidIcon className="w-5 h-5" />
      ) : (
        <BellOutlineIcon className="w-5 h-5" />
      ),
      label: "Notifications",
    },
    {
      href: "/profile",
      icon: pathname.toLowerCase().startsWith("/profile") ? (
        <UserSolidIcon className="w-5 h-5" />
      ) : (
        <UserOutlineIcon className="w-5 h-5" />
      ),
      label: "Profile",
    },
  ];

  return (
    <>
      {isHamburgerOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsHamburgerOpen(false)}
        />
      )}
      <aside
        className={`fixed lg:relative ${
          isHamburgerOpen ? "flex" : "hidden"
        } lg:flex h-screen flex-col border-r bg-white z-30 transition-all duration-300 ${
          !isOpen
            ? "w-0 lg:w-[104px] -translate-x-full lg:translate-x-0"
            : "w-[266px]"
        }`}
      >
        <div className="relative flex items-center h-24 justify-between border-b border-grey-button-border">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden lg:block absolute -right-5 p-3 rounded-full border border-grey-button-border bg-white"
          >
            <DoubleChevronLeft
              className={`w-[14px] h-[14px] ${isOpen ? "" : "rotate-180"}`}
            />
          </button>
          <Link
            href="/dashboard"
            className={`flex items-center m-0 p-0 ${isOpen ? "ml-3" : "ml-7"}`}
            onClick={() => {
              setIsHamburgerOpen(false);
            }}
          >
            <JedeIcon
              withText={isOpen}
              className={`${isOpen ? "w-32" : "w-10 h-10"}`}
            />
          </Link>
        </div>

        <nav className="flex-1 items-center justify-center space-y-8">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={isOpen ? item.label : ""}
              isActive={pathname
                .toLowerCase()
                .startsWith(item.href.toLowerCase())}
              isOpen={isOpen}
            />
          ))}
        </nav>

        <div>
          <NavItem
            href="/logout"
            icon={<LogoutIcon />}
            label={isOpen ? "Log Out" : ""}
            isOpen={isOpen}
            onClick={() => signOut()}
          />
        </div>
      </aside>
    </>
  );
}
