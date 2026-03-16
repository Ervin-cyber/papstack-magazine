"use client";
import Link from "next/link";
import Logo from "./Logo";
import Image from "next/image";
import { useState, useEffect } from "react";
import { NavigationItem } from "@/types/NavigationItem";

export default function Navbar({ navigationItems }: { navigationItems: NavigationItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleEscKeyPress = (e: { keyCode: number; }) => {
      if (e.keyCode === 27 && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isOpen]);
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation(); // Prevents event from bubbling up
    setIsOpen(false);
  };

  return (
    <div className="w-full divide-b divide-gray-300 border-y md:border-gray-300 lg:border-gray-300 border-transparent md:mb-2 lg:mb-2 xl:mb-2">
      <div style={{
        display: "flex",
        justifyContent: "center",
        color: "white"
      }}>
        <nav className="flex w-full items-center justify-between px-6 h-13 bg-white text-gray-700 border-b border-gray-300 z-10">
          <div className="flex justify-between items-center w-full">
            <button className="md:hidden lg:hidden mr-2 align-middle" aria-label="Open Menu" onClick={handleDrawer}>
              <Image
                src="/images/hamburger-menu-icon.png"
                alt="Logo"
                width={"20"}
                height={"20"}
                className="relative"
              />
            </button>
            <Logo />
          </div>
          {isOpen && (
            <div className="z-10 fixed inset-0 transition-opacity">
              <div
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-black opacity-50"
                tabIndex={0}
              ></div>
            </div>
          )}
          <aside
            className={`transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${isOpen ? "translate-x-0" : "-translate-x-full"
              } `}
          >
            <span className="flex w-full items-center my-10" onClick={handleClose}>
              <Logo />
            </span>
            {navigationItems.map((navigationItem: NavigationItem) => {
              return (
                <Link href={`/${navigationItem.slug.current}`} key={navigationItem._id} onClick={handleClose}>
                  <span
                    key={navigationItem._id}
                    className="text-sm flex items-center mx-5 pb-3 pt-5 border-b border-gray-300 hover:scale-105 transition"
                  >
                    <span className="">{navigationItem.name}</span>
                  </span>
                </Link>
              );
            })}
          </aside>
        </nav>
      </div>

      {navigationItems.length > 0 &&
        <div className="w-full mx-auto h-full my-1">
          <div style={{
            display: "flex",
            justifyContent: "center",
          }}>
            <ul className="hidden md:flex gap-x-6 text-black">
              {navigationItems.map((navigationItem: NavigationItem) => (
                <li key={navigationItem._id} className="hover:scale-105 transition">
                  <Link href={`/${navigationItem.slug.current}`} key={navigationItem._id}>
                    <p className="text-sm">{navigationItem.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    </div>
  );
};