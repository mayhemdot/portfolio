import { PropsWithChildren } from "react";

const ServiceMessage = ({ title, children, variant }: PropsWithChildren<{ title: string; variant?: "success" | "error" }>) => {
  return (
    <div className="gradient mx-auto mt-32 w-fit rounded-2xl p-8">
      <h1 className={"fsSubtitle fsAccent mb-3 text-left font-bold"}>{title}</h1>

      <div className={"fsNormal flex flex-col items-start gap-4"}>{children}</div>
    </div>
  );
};

export default ServiceMessage;
