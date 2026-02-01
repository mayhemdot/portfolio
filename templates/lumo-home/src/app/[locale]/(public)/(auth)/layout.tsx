import type { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return <div className="container mx-auto">{children}</div>;
}
