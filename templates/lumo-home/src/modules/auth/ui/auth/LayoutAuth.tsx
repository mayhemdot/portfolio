import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

type Props = {
  imageSrc: string;
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  action: React.ReactNode;
};

export function LayoutAuth({
  children,
  action,
  footer,
  title, // Login to your account
  description, //   Enter your email below to login to your account
  imageSrc = "/images/product_2.jpg",
}: Props) {
  return (
    <div className="flex items-stretch md:mx-auto fl-my-48/128 mx-2 max-w-4xl h-fit justify-center">
      {imageSrc && (
        <div className="hidden lg:block relative min-h-full w-1/2">
          <Image
            fill
            src={imageSrc}
            alt="Cover Image"
            className="rounded-4xl object-cover rounded-r-none"
          />
        </div>
      )}
      <Card
        className={cn(
          "bg-secondary min-h-full! px-0 lg:px-8 lg:max-w-145 w-full max-w-md lg:w-1/2 rounded-4xl",
          {
            "lg:rounded-l-none!": imageSrc,
          },
        )}
      >
        <CardHeader>
          <CardTitle className="fl-text-24/32">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <CardAction>{action}</CardAction>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="pt-0">{footer}</CardFooter>
      </Card>
    </div>
  );
}
