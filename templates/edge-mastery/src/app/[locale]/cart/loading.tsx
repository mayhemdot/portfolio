import SkeletonCartPage from "@/modules/cart/skeletons/SkeletonCartPage";
import LayoutWithBreadcrumbs from "@/modules/common/components/LayoutWithBreadcrumbs";

export default function Loading() {
  return (
    <LayoutWithBreadcrumbs
      paddings={false}
      breadcrumbs={[
        {
          id: "0",
          label: "Home",
          url: "/",
        },
        {
          id: "1",
          label: "Cart",
          url: "/cart",
        },
      ]}
    >
      <SkeletonCartPage />
    </LayoutWithBreadcrumbs>
  );
}
