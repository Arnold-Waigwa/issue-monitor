"use client";
import { Select } from "@radix-ui/themes";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
//use radix to

const PageNumberSelection = () => {
  const pageSizes: { label: string; value: number }[] = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "15", value: 15 },
  ];

  const router = useRouter();
  //read current query params and path
  const path = usePathname();
  const searchParams = useSearchParams();
  const assignPageSize = (size: string) => {
    //initialize urlsearchparams for mutating
    const params = new URLSearchParams(searchParams);
    //add the size into the query
    params.set("pageSize", size);
    router.push(`${path}?${params.toString()}`);
  };
  return (
    <Select.Root onValueChange={assignPageSize}>
      <Select.Trigger placeholder="Page Size" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Available Sizes</Select.Label>
          {pageSizes.map((size) => (
            <Select.Item key={size.value} value={size.label}>
              {size.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default PageNumberSelection;
