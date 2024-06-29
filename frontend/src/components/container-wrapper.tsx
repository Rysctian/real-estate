import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { BackButton } from "./back-button";
import { ReactNode } from "react";

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel?: ReactNode;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

export default function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) {
  return (
    <Card className="w-full md:w-[560px] flex flex-col items-center justify-center">
      <CardHeader>{headerLabel}</CardHeader>
      <CardContent className="w-full">{children}</CardContent>

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
}
