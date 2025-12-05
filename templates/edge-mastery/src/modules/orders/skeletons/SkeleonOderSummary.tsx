import SkeletonCartTotals from "@/modules/cart/skeletons/SkeletonCartTotals";
import SkeletonButton from "@/modules/common/skeletons/SkeletonButton";

const SkeletonOrderSummary = () => {
  return (
    <div className="grid-cols-1">
      <SkeletonCartTotals header={false} />
      <div className="mt-4">
        <SkeletonButton />
      </div>
    </div>
  );
};

export default SkeletonOrderSummary;
