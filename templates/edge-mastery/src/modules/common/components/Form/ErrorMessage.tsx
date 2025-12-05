import { Alert } from "@heroui/alert";

const ErrorMessage = ({ error, "data-testid": dataTestid }: { error?: string | null; "data-testid"?: string }) => {
  if (!error) {
    return null;
  }

  return (
    <div key={"danger"} className="w-full flex items-center my-3">
      <Alert title={"Error"} description={error} variant="bordered" color="danger" />
    </div>
  );
};

export default ErrorMessage;
