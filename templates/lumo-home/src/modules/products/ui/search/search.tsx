"use client";

// import { useQuery } from '@tanstack/react-query'
import { CommandLoading } from "cmdk";
import {
  Search,
  // Package,
  // Shirt,
  // Smartphone,
  // Headphones,
  // Watch,
  // Camera,
  // Gamepad2,
} from "lucide-react";
import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useEffectEvent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { Product } from "@/modules/products/model/types";
import {
  type PaginatedDocs,
  searchProducts,
} from "@/modules/products/queries/search";
import { Media } from "@/shared/components/Media";
import { Button } from "@/shared/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

export default function SearchInputClient() {
  const [open, setOpen] = useState(false);

  const [term, setSearchTerm] = useQueryState(
    "query",
    parseAsString.withDefault("").withOptions({
      shallow: false,
    }),
  );

  // const { isLoading, data: products } = useQuery({
  //   queryKey: ['search', term],
  //   queryFn: async () => await searchProducts({ term }),
  //   enabled: !!term,
  // })
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<PaginatedDocs<Product>>({
    docs: [],
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!term || isLoading) return;
   
    setIsLoading(true);

    searchProducts({ term }).then((res) => {
      setProducts(res);
    }).catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    });

  }, [term]);

  useEffect(() => {
    if (!open) {
      setSearchTerm("");
    }
  }, [open, setSearchTerm]);

  const setSearchTermWithDebounce = useDebouncedCallback(
    (value: string) => setSearchTerm(value),
    1000,
  );
  const groupedProducts = products?.docs?.reduce(
    (acc, product) => {
      const categoryId =
        typeof product.category === "object"
          ? product.category?.id
          : product.category;

      if (!categoryId) return acc;

      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(product);
      return acc;
    },
    {} as Record<string, typeof products.docs>,
  );

  return (
    <div className="flex items-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="p-2 md:p-3 bg-secondary rounded-full">
            <Button variant="ghost" size={"icon"}>
              <Search className="size-4" />
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="overflow-hidden p-0 shadow-lg h-[400px]">
          <DialogTitle className="sr-only hidden">Название диалога</DialogTitle>

          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-input]]:outline-none [&_[cmdk-input]]:ring-0 [&_[cmdk-input]]:border-0 [&_[cmdk-input]]:focus:ring-0 [&_[cmdk-input]]:focus:outline-none [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            <CommandInput
              className="py-12"
              placeholder="Search products..."
              onValueChange={(value) => setSearchTermWithDebounce(value)}
              // onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CommandList>
              <CommandEmpty>No products found.</CommandEmpty>
              {isLoading ? (
                <CommandLoading />
              ) : (
                Object.entries(groupedProducts || []).map(
                  ([category, categoryProducts]) => (
                    <CommandGroup key={category} heading={category}>
                      {categoryProducts.map((product) => {
                        const Icon = product.images;
                        return (
                          <CommandItem
                            key={product.id}
                            value={`${product.title}`}
                            asChild
                            onSelect={() => {
                              setOpen(false);
                              // Handle product selection
                              // console.log('Selected product:', product)
                            }}
                          >
                            <Link href={`/products/${product.slug}`}>
                              <div className="size-16 relative">
                                <Media resource={product.images?.[0]} fill />
                              </div>
                              {/* <Icon className="mr-2 size-4" /> */}
                              <div className="flex flex-col">
                                <span>{product.title}</span>
                                <span className="text-base text-muted-foreground">
                                  {"Price: "} • {product.price}
                                </span>
                              </div>
                            </Link>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  ),
                )
              )}
            </CommandList>
          </Command>

          <DialogFooter>
            <Button
              type="submit"
              variant={"outline"}
              className="w-full mt-auto"
              onClick={() => setSearchTerm("")}
            >
              Очистить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* <div className="text-center text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>{" "}
        to open search
      </div> */}
    </div>
  );
}
