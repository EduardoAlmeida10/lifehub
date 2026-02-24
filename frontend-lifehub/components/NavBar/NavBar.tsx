import { User2Icon } from "lucide-react";
import Image from "next/image";
import iconLogo from "@/assets/icons/iconLogo.svg";

export function NavBar() {
  return (
    <nav className="flex justify-between items-center px-8 w-full h-15 bg-primary text-white">
      <div className="flex items-center gap-2">
        <Image src={iconLogo} alt="" width={30} height={30} priority />
        <h1 className="text-2xl">LifeHub</h1>
      </div>
      <div className="flex gap-2">
        <User2Icon />
        <p>Eduardo</p>
      </div>
    </nav>
  );
}
