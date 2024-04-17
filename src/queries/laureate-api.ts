import { NobelLaureate } from "@/models/NobelLaureat";
import axios from "axios";

let OFFSET = 12;

export const getLaureates = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<{
  data: NobelLaureate[];
  currentPage: number;
  nextPage: number | null;
}> => {
  console.log("pageParam: ", pageParam);

  const { data } = await axios.get<{
    laureates: NobelLaureate[];
    meta: { count: number };
  }>(`http://api.nobelprize.org/2.0/laureates?offset=${pageParam}&limit=12`);

  return {
    data: data.laureates,
    currentPage: pageParam,
    nextPage: pageParam + OFFSET < data.meta.count ? pageParam + OFFSET : null,
  };
};
