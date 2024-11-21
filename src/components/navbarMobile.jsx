"use client"
import { HeartIcon, HamburgerMenuIcon, LockClosedIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React, { useState } from 'react'

export const NavbarMobile = () => {
  const [isSearchExpanded, setSearchExpanded] = useState(false);

  const toggleSearch = () => {
    setSearchExpanded((prev) => !prev);
  };

  return (

    <div className="md:hidden flex justify-between items-center h-[64px]">
      <div className="flex gap-x-3 items-center font-bold">
        <HamburgerMenuIcon />
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-3 py-2"
          onClick={toggleSearch}
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>
      </div>
      {/* Expanded Mobile Search */}
      {isSearchExpanded && (
        <div className="absolute inset-0 bg-background/95 flex justify-end items-center w-full max-w-xl px-4">
          <form className="flex w-full z-50">
            <button
              type="button"
              className="p-2 rounded-full bg-muted-foreground text-background"
              onClick={toggleSearch}
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>

            <input
              className="flex-1 px-4 py-2 rounded-full border border-input w-full  text-sm focus:outline-none"
              placeholder="Find your Favourite item and bring it home"
              aria-invalid="false"
              name="search"
            />


          </form>
        </div>
      )}
      <div className="font-semibold">
        <Link href={"/"}>Desired Web</Link>
      </div>
      <div className="flex gap-x-5 relative items-center">
        <Link href={"/wish-list"}>
          <HeartIcon className="h-6 w-6" />
        </Link>
        <Link href={"/cart"}>
          <LockClosedIcon className="h-6 w-6" />
        </Link>
      </div>
    </div>

  )
}
