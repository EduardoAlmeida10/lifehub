"use client";

import Link from "next/link";
import { ComponentType } from "react";

interface ItemMenuProps {
  label: string;
  href: string;
  icon: ComponentType<{ size: number }>;
}

export default function ItemMenu({ label, href, icon: Icon }: ItemMenuProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-white hover:bg-primary`}
    >
      <Icon size={20} />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
