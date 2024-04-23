"use client";

import { NobelLaureate } from "@/models/NobelLaureat";
import LaureateCard from "./LaureateCard";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getLaureates } from "@/queries/laureate-api";
import { useInView } from "react-intersection-observer";
import { Suspense, useEffect, useMemo } from "react";

import { useSearchParams } from "next/navigation";
import FilterBar from "./FilterBar";
import { useSession } from "next-auth/react";

const Laureates = () => {
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const gender = searchParams?.get("gender");
  const birth = searchParams?.get("birthDate");
  const death = searchParams?.get("deathDate");
  const category = searchParams?.get("nobelPrizeCategory");

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

  console.log("view data", data);

  return (
    <div className="min-h-screen justify-center items-center py-6 px-16">
      <FilterBar />
      <div className="py-4 px-16">
        {!session?.user.username && (
          <div className="text-center flex flex-col gap-6 mt-10">
            <p className="text-orange-500 text-xl">
              Welcome to Laureates Website
            </p>
            <p className="text-gray-700 text-lg">
              Please sign-in to view content
            </p>
          </div>
        )}
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
  );
};

export default Laureates;
