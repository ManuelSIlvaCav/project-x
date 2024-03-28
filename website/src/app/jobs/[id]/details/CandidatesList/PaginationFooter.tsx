"use client";

import { Button } from "@/components/Button";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  cursor?: string | null;
};

export default function PaginationFooter(props: Props) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  function handleChangeCursor(cursor: string) {
    console.log("cursor", cursor);
    const params = new URLSearchParams(searchParams);
    params.set("cursor", cursor);
    replace(`${pathName}?${params.toString()}`);
  }

  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">10</span> of{" "}
          <span className="font-medium">20</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <Link
          href="#"
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Previous
        </Link>
        <Button
          variant="outline"
          onClick={() => {
            handleChangeCursor(props.cursor || "");
          }}
        >
          Next
        </Button>
      </div>
    </nav>
  );
}