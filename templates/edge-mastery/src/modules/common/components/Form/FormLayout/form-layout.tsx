import React, { type PropsWithChildren } from "react";
import { Text } from "@/shared/components/Text";

type Props = {
  testid: string;
  description?: string | React.ReactNode | null;
  actions: React.ReactNode[];
};

export function FormLayout({ testid, description, actions, children }: PropsWithChildren<Props>) {
  return (
    <div className="w-full max-w-md mx-auto py-8" data-testid={testid}>
      {description && (
        <Text comp="h2" size={"sm"} variant="secondary" className="text-left my-8 font-light">
          {description}
        </Text>
      )}
      {children}
      {actions?.map((action, index) => (
        <React.Fragment key={index.toString()}>{action}</React.Fragment>
      ))}
    </div>
  );
}
