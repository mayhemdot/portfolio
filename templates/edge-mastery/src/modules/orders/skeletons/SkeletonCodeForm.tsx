import { Skeleton } from "@heroui/skeleton";

const SkeletonCodeForm = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Skeleton className="w-24 h-7 bg-default-200" />
      <div className="grid grid-cols-[1fr_80px] gap-2">
        <Skeleton className="h-12 bg-default-200" />
        <Skeleton className="h-12 bg-default-200" />
      </div>
    </div>
  );
};

export default SkeletonCodeForm;
