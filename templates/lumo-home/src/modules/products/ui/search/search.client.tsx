// "use client";
// import { useDebouncedCallback } from "use-debounce";
// import { parseAsString, useQueryState } from "nuqs";
// import { Input } from "@/shared/components/ui/input";
// import { Suspense, use } from "react";
// import { PaginatedDocs } from "payload";

// type Props = {
//   products: PaginatedDocs<Product>;

//   //   searchAction: Promise<PaginatedDocs<Product>>;
// };

// export function SearchInputClient({ products }: Props) {
//   const [searchTerm, setSearchTerm] = useQueryState(
//     "query",
//     parseAsString.withDefault("")
//   );

//   //   const products = use(searchAction);
//   //   console.log("products", products);
//   return (
//     <div className="flex items-center gap-2 grow max-w-[420px]">
//       <Input
//         placeholder="Search"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//     </div>
//   );
// }
