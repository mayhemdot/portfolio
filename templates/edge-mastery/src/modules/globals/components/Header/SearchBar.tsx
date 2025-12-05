"use client";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useDisclosure } from "@heroui/use-disclosure";
import type { LucideProps } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { ProductPreview } from "@/modules/products/components/ProductPreview";
import type { StoreProduct } from "@/modules/products/types";
import { cn } from "@/shared/utils/cn";

export function SearchBar({
  title,
  inModal = false,
  actions,
  className,
}: {
  title: string;
  actions: React.ReactNode;
  inModal?: boolean;
  className?: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const ref = useRef<HTMLInputElement | null>(null);
  // const [value, setValue] = useState("")
  // const [setDebouncedValue] =  useDebounceCallback(callback, delay) {}
  // const searchedItems = []

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<StoreProduct[]>([]);
  const [debounceSearchTerm] = useDebounce(searchTerm, 1000);
  // MeiliSearch URL with environment variable fallback
  const meiliSearchUrl = process.env.NEXT_PUBLIC_SEARCH_ENDPOINT || "http://localhost:7700";
  const searchApiKey = process.env.NEXT_PUBLIC_SEARCH_API_KEY; // Ensure this is set in your environment

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "k") {
      event.preventDefault();
      onOpen();
    }
  };

  useEffect(() => window.addEventListener("keydown", keyDownHandler));

  useEffect(() => {
    const handleSearch = async () => {
      if (!debounceSearchTerm) return;

      try {
        const response = await fetch(`${meiliSearchUrl}/indexes/products/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${searchApiKey}`, // Use the search-only API key
          },
          body: JSON.stringify({ q: debounceSearchTerm }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data = await response.json();
        setResults(data.hits);
      } catch (error) {
        console.error(error);
      }
    };
    handleSearch();
  }, [debounceSearchTerm, meiliSearchUrl, searchApiKey]);

  return (
    <>
      <Button onPress={onOpen} variant="flat" isIconOnly={!inModal} className={cn("ml-0! pl-0!", className)}>
        <Input
          type="search"
          placeholder={title}
          disabled
          className={cn("w-full", {
            hidden: !inModal,
          })}
        />
        <IconSearch className={"size-5 shrink-0"} />
      </Button>

      <Modal isOpen={isOpen} hideCloseButton={true} onOpenChange={onOpenChange} size="xl" placement="top">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="px-0">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={title}
                  startContent={<IconSearch className={"ml-8 mr-2 size-6 shrink-0"} />}
                  size={"lg"}
                  endContent={<Kbd className={"mr-8 text-small"}>esc</Kbd>}
                  variant="underlined"
                  className="border-none h-full fl-text-16/24"
                  isClearable
                  // onChange={(e) => setValue(e.target.value)}
                />
                {/* <Button variant="shadow" isIconOnly onPress={handleSearch}>
                  <SearchIcon className="size-4" />
                </Button> */}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2 md:gap-4 min-h-[300px]">
                  {results.length
                    ? results.map((p) => <ProductPreview key={p.id.toString()} product={p} type="line" region={null} />)
                    : null}
                </div>
              </ModalBody>

              <ModalFooter className="pt-2 pb-0 px-0">
                <Button
                  variant="flat"
                  className="w-full"
                  size="lg"
                  color="default"
                  radius="none"
                  onPress={() => {
                    setSearchTerm("");
                    setResults([]);
                  }}
                >
                  Очистить
                </Button>
                {/* {actions} */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function IconSearch(props: LucideProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="16"
      role="presentation"
      viewBox="0 0 24 24"
      width="16"
      className="text-base text-default-400 pointer-events-none shrink-0"
      //   tabIndex="-1"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <path d="M22 22L20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
    </svg>
  );
}
