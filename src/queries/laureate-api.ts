import { NobelLaureate } from "@/models/NobelLaureat";
import axios from "axios";

let OFFSET = 12;

type ILaureatesInput = {
  pageParam: number;
  gender: string | null;
  birth: string | null;
  death: string | null;
  category: string | null;
};

export const getLaureates = async ({
  pageParam,
  gender,
  birth,
  death,
  category,
}: ILaureatesInput): Promise<{
  data: NobelLaureate[];
  currentPage: number;
  nextPage: number | null;
}> => {
  console.log("pageParam: ", pageParam);

  let filters = `${gender !== null ? "&gender=" + gender : ""}${
    birth ? "&birthDate=" + birth : ""
  }${death ? "&deathDate=" + death : ""}${
    category !== null ? "&nobelPrizeCategory=" + category : ""
  }`;

  console.log("filters: ", filters);

  const { data } = await axios.get<{
    laureates: NobelLaureate[];
    meta: { count: number };
  }>(
    `http://api.nobelprize.org/2.0/laureates?offset=${pageParam}&limit=12${filters}`
  );

  return {
    data: data.laureates,
    currentPage: pageParam,
    nextPage: pageParam + OFFSET < data.meta.count ? pageParam + OFFSET : null,
  };
};
