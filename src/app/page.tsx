"use client";

import { NobelLaureate } from "@/models/NobelLaureat";
import LaureateCard from "./components/LaureateCard";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getLaureates } from "@/queries/laureate-api";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

// async function getData() {
//   const res = await fetch(
//     "http://api.nobelprize.org/2.0/laureates?offset=0&limit=10"
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export default function Home() {
  // const data = await getData();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["laureates"],
    queryFn: getLaureates,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  console.log(data);

  return (
    <main className="bg-gray-100 mx-auto px-4 sm:px-6">
      <div className="min-h-screen flex justify-center items-center py-24 px-16">
        <div className="py-24 px-16">
          {data?.pages.map((page) => {
            return (
              <div key={page.currentPage} className="mt-4">
                <div className="mx-auto grid grid-flow-row-dense gap-4 sm:grid-cols-1 lg:grid-cols-2 scrollbar-hide">
                  {page.data.map((laureate: NobelLaureate, i: number) => (
                    <LaureateCard key={`laureate_${i}`} {...laureate} />
                  ))}
                </div>
              </div>
            );
          })}

          <div ref={ref}>{isFetchingNextPage && "loading..."}</div>
        </div>
      </div>
    </main>
  );
}
