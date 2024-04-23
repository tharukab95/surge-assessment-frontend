"use client";

import { NobelLaureate } from "@/models/NobelLaureat";
import LaureateCard from "./LaureateCard";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getLaureates } from "@/queries/laureate-api";
import { useInView } from "react-intersection-observer";
import { Suspense, useEffect, useMemo } from "react";

import { useSearchParams } from "next/navigation";
import FilterBar from "./FilterBar";
// import useAxiosAuth from "@/hooks/useAxiosAuth";

// async function getData() {
//   const res = await fetch(
//     "http://api.nobelprize.org/2.0/laureates?offset=0&limit=10"
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

const Laureates = () => {
  // const data = await getData();
  // const axiosAuth = useAxiosAuth();

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
    // {
    //   let filters = `${gender !== null ? "&gender=" + gender : ""}${
    //     birth ? "&birthDate=" + birth : ""
    //   }${death ? "&deathDate=" + death : ""}${
    //     category !== null ? "&nobelPrizeCategory=" + category : ""
    //   }`;
    //   const { data } = await axiosAuth.get<{
    //     laureates: NobelLaureate[];
    //     meta: { count: number };
    //   }>(`/api/laureates?offset=${pageParam}&limit=12${filters}`);
    //   console.log("my data: ", data);
    //   return {
    //     data: data.laureates,
    //     currentPage: pageParam,
    //     nextPage:
    //       pageParam + OFFSET < data.meta.count ? pageParam + OFFSET : null,
    //   };
    // },
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
