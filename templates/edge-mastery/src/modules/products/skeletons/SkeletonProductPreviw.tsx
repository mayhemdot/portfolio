// import { Container } from "@medusajs/ui"

const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-9/16 w-full bg-ui-bg-subtle" />
      <div className="flex justify-between text-base-regular mt-2">
        <div className="w-2/5 h-6 "></div>
        <div className="w-1/5 h-6 "></div>
      </div>
    </div>
  );
};

export default SkeletonProductPreview;
