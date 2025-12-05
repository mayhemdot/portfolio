import { MinusIcon, PlusIcon } from "lucide-react";
import type { FC } from "react";
import { cn } from "@/shared/utils/cn";
import LoadingDots from "../Loading/Dots";

// TODO: removing or applying
function IncrementButton({ type, isLoading }: { type: "plus" | "minus"; isLoading: boolean }) {
  //   const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (isLoading) {
          e.preventDefault();
        }
      }}
      aria-label={type === "plus" ? "Increase item quantity" : "Reduce item quantity"}
      aria-disabled={isLoading}
      className={cn(
        "ease flex h-full  min-w-[28px] max-w-[28px]  md:min-w-[36px] md:max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
        {
          "cursor-not-allowed": isLoading,
          "ml-auto": type === "minus",
        },
      )}
    >
      {isLoading ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : type === "plus" ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
  isLoading,
}: {
  item: { quantity: number; id: string };
  type: "plus" | "minus";
  isLoading: boolean;
}) {
  // const [message, formAction] = useFormState(updateItemQuantity, null);
  const payload = {
    lineId: item.id,
    // variantId: item.merchandise.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  };
  //   const actionWithVariant = formAction.bind(null, payload);

  return (
    //action={actionWithVariant}
    <form>
      <IncrementButton type={type} isLoading={isLoading} />
      <p aria-live="polite" className="sr-only">
        {"what the fack"}
      </p>
    </form>
  );
}

const InputIncrement: FC<{
  item: {
    quantity: number;
    id: string;
  };
}> = ({ item }) => {
  return (
    <div className="flex h-8 md:h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700 w-fit">
      <EditItemQuantityButton item={item} type="minus" isLoading={false} />
      <p className="w-4 md:w-6 text-center">
        <span className="w-full text-sm">{item.quantity}</span>
      </p>
      <EditItemQuantityButton item={item} type="plus" isLoading={false} />
    </div>
  );
};

export default InputIncrement;
