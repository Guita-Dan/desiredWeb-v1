import Link from "next/link";
import { MagnifyingGlassIcon, HeartIcon, LockClosedIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import AuthButton from "./header-auth";
import { NavbarMobile } from "./navbarMobile";


const Navbar = () => {

    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 bg-background/95 fixed items-center h-16 z-50">
            <div className="container w-full">
                {/* Desktop Version */}
                <div className="hidden md:flex gap-x-8 justify-between items-center">
                    <div className="font-semibold flex gap-x-3 items-center">
                        <HamburgerMenuIcon />
                        <Link href={"/"}>Desired Web</Link>
                    </div>
                    <form className="relative bg-background/95 px-4 mx-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-full flex-1">
                        <div className="space-y-2 md:space-y-0 relative">
                            <MagnifyingGlassIcon className="absolute m-2 h-6 w-4 left-2 text-muted-foreground transition-all duration-500" />
                            <input
                                className="flex h-10 w-full px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 border border-input bg-background ring-offset-background placeholder:text-muted-foreground pl-10 rounded-full transition-all duration-500"
                                placeholder="Find your Favourite item and bring it home"
                                aria-invalid="false"
                                name="search"
                            />
                        </div>
                    </form>
                    <AuthButton />
                    <div className="flex gap-x-5 relative items-center">
                        <Link href={"/wish-list"}>
                            <HeartIcon className="h-6 w-6" />
                        </Link>
                        <Link href={"/cart"}>
                            <LockClosedIcon className="h-6 w-6" />
                        </Link>
                    </div>
                </div>

                <NavbarMobile />

            </div>
        </nav>
    );
};

export default Navbar;
