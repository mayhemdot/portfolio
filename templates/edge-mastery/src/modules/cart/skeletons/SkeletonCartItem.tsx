import { Skeleton } from "@heroui/skeleton";

const SkeletonCartItem = () => {
  return (
    <tr className="w-full m-4">
      <td className="!pl-0 p-4 w-24">
        <Skeleton className="flex w-24 h-24 p-4 rounded-lg bg-default-200" />
      </td>
      <td className="text-left">
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-32 h-4 rounded-lg bg-default-200" />
          <Skeleton className="w-24 h-4 rounded-lg bg-default-200" />
        </div>
      </td>
      <td>
        <div className="flex gap-2 items-center">
          <Skeleton className="w-6 h-8 rounded-lg bg-default-200" />
          <Skeleton className="w-14 h-10 rounded-lg bg-default-200" />
        </div>
      </td>
      <td>
        <div className="flex gap-2">
          <Skeleton className="w-12 h-6 rounded-lg bg-default-200" />
        </div>
      </td>
      <td className="!pr-0 text-right">
        <div className="flex gap-2 justify-end">
          <Skeleton className="w-12 h-6 rounded-lg bg-default-200" />
        </div>
      </td>
    </tr>
  );
};

export default SkeletonCartItem;
