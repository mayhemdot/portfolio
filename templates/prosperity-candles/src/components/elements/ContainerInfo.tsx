import { FC, PropsWithChildren } from "react";

interface ContainerInfoProps {}

const ContainerInfo: FC<PropsWithChildren<ContainerInfoProps>> = ({ children }) => {
  return <div className="container flex flex-col items-center justify-start gap-1 px-4 pb-16 pt-32 sm:px-8 md:gap-2">{children}</div>;
};

export default ContainerInfo;
