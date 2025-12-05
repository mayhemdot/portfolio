import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { Gutter } from "@/modules/common/components/Gutter";
import SkeletonOrderSummary from "@/modules/orders/skeletons/SkeleonOderSummary";
import SkeletonCodeForm from "@/modules/orders/skeletons/SkeletonCodeForm";

// import repeat from "@/shared/utils/repeat";
// import SkeletonCartItem from "./SkeletonCartItem";

const SkeletonCartPage = () => {
  return (
    // <div className="content-container h-full" data-testid="cart-loading">

    <Gutter gap-horizontal="sm" gap-vertical="md" className="grid grid-cols-1 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-y-3">
        <div>
          <div className="pb-3 flex items-center">
            <div className="w-20 h-12 animate-pulse" />
          </div>
          <Table aria-label="Loading cart items" removeWrapper>
            <TableHeader>
              <TableColumn className="!pl-0">
                <div className="w-10 h-6 animate-pulse" />
              </TableColumn>

              <TableColumn>
                <span>.</span>
              </TableColumn>

              <TableColumn>
                <div className="w-16 h-6 animate-pulse" />
              </TableColumn>

              <TableColumn>
                <div className="w-12 h-6 animate-pulse" />
              </TableColumn>

              <TableColumn className="!pr-0">
                <div className="flex justify-end">
                  <div className="w-12 h-6 animate-pulse" />
                </div>
              </TableColumn>
            </TableHeader>

            <TableBody>
              {Array.from({ length: 4 }).map((_, index) => (
                <TableRow key={index.toString()}>
                  <TableCell>
                    <div className="w-10 h-6 animate-pulse" />
                  </TableCell>

                  <TableCell>
                    {/* пусто */} <span>.</span>
                  </TableCell>

                  <TableCell>
                    <div className="w-16 h-6 animate-pulse" />
                  </TableCell>

                  <TableCell>
                    <div className="w-12 h-6 animate-pulse" />
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end">
                      <div className="w-12 h-6 animate-pulse" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <Table>
              <Table.Header className="border-t-0">
                <Table.Row>
                  <Table.HeaderCell className="!pl-0">
                    <div className="w-10 h-6  animate-pulse" />
                  </Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>
                    <div className="w-16 h-6  animate-pulse" />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <div className="w-12 h-6 animate-pulse" />
                  </Table.HeaderCell>
                  <Table.HeaderCell className="!pr-0">
                    <div className="flex justify-end">
                      <div className="w-12 h-6  animate-pulse" />
                    </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {repeat(4).map((index) => (
                  <SkeletonCartItem key={index} />
                ))}
              </Table.Body>
            </Table> */}
        </div>
      </div>

      <div className="relative h-full min-h-full">
        <div className="flex flex-col gap-3  ">
          <SkeletonOrderSummary />
          <SkeletonCodeForm />
        </div>
      </div>
    </Gutter>
  );
};

export default SkeletonCartPage;
