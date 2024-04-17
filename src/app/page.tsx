"use client";

import { NobelLaureate } from "@/models/NobelLaureat";
import LaureateCard from "./components/LaureateCard";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getLaureates } from "@/queries/laureate-api";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo } from "react";
import FilterBar from "./components/FilterBar";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const gender = searchParams.get("gender");
  const birth = searchParams.get("birthDate");
  const death = searchParams.get("deathDate");
  const category = searchParams.get("nobelPrizeCategory");

  const queryCLient = useQueryClient();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["laureates"],
    queryFn: ({ pageParam }) =>
      getLaureates({ pageParam, gender, birth, death, category }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    if (searchParams) {
      queryCLient.invalidateQueries({ queryKey: ["laureates"] });
    }
  }, [searchParams, queryCLient]);

  console.log(data);

  return (
    <main className="bg-gray-100 mx-auto px-4 sm:px-6">
      <div className="min-h-screen justify-center items-center py-6 px-16">
        <FilterBar />
        <div className="py-4 px-16">
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
