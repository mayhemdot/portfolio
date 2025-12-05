import { Skeleton } from "@heroui/skeleton";

const SkeletonCartTotals = ({ header = true }) => {
  return (
    <div className="flex flex-col gap-4">
      {header && <Skeleton className="rounded-lg h-4 w-32 bg-default-200" />}

      <div className="flex items-center justify-between">
        <Skeleton className="rounded-lg h-3 w-32 bg-default-200" />
        <Skeleton className="rounded-lg h-3 w-32 bg-default-200" />
      </div>

      <div className="flex items-center justify-between my-4">
        <Skeleton className="rounded-lg h-3 w-24 bg-default-200" />
        <Skeleton className="rounded-lg h-3 w-24 bg-default-200" />
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="rounded-lg h-3 w-28 bg-default-200" />
        <Skeleton className="rounded-lg h-3 w-20 bg-default-200" />
      </div>

      <div className="w-full border-b border-default-300 border-dashed my-4"></div>

      <div className="flex items-center justify-between">
        <Skeleton className="rounded-lg h-6 w-32 bg-default-200" />
        <Skeleton className="rounded-lg h-6 w-24 bg-default-200" />
      </div>
    </div>
  );
};

export default SkeletonCartTotals;
