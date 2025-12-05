import { Spinner } from "@heroui/spinner";
import { Trash } from "lucide-react";
import { useState } from "react";
// import { deleteLineItem } from "@/lib/data/cart";
// import { cn } from "@/lib/utils";
import { useCartStore } from "@/modules/cart/store/cart";
import { useRegionStore } from "@/modules/common/store/region";
import { cn } from "@/shared/utils/cn";

const DeleteButton = ({ id, children, className }: { id: string; children?: React.ReactNode; className?: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { removeItem } = useCartStore();
  const { region } = useRegionStore();
  //   const region = useCartStore.getState().region;
  const handleDelete = async (id: string) => {
    console.log("handleDelete", id, region?.currency_code);
    setIsDeleting(true);
    removeItem(id, region?.currency_code ?? "usd");
    // await deleteLineItem(id).catch((err) => {
    //   setIsDeleting(false);
    // });
    setIsDeleting(false);
  };

  return (
    <div className={cn("flex items-center justify-center text-small-regular grow px-2", className)}>
      <button
        type="button"
        className={"flex gap-x-1 items-center fsSmallest cursor-pointer group"}
        onClick={() => handleDelete(id)}
      >
        {isDeleting ? (
          <Spinner className="animate-spin size-3" />
        ) : (
          <Trash className="size-4 md:size-5 text-default-200 group-hover:text-danger" />
        )}
        {children && <span>{children}</span>}
      </button>
    </div>
  );
};

export default DeleteButton;
