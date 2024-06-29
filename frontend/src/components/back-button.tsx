"use client"

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

type BackButtonProps = {
    href: string;
    label: string;
}

export function BackButton({
    href,
    label
}: BackButtonProps ) {
  return (
    <Button variant="link" size="sm" className="font-normal w-full" asChild>
        <Link
        to={href}>
            {label}
        </Link>
    </Button>
  );
};
