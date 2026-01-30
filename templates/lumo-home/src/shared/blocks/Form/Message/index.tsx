import type React from "react";
import {Text} from "@/shared/components/Text";
import { Width } from "../Width";

export const Message: React.FC<{ message: Record<string, any> }> = ({
  message,
}) => {
  return (
    <Width className="my-12" width="100">
      {message && <Text>{message?.[0]}</Text>}
    </Width>
  );
};
