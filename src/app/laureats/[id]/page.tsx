import CommentSection from "@/app/components/CommentSection";
import { NobelLaureate } from "@/models/NobelLaureat";
import axiosPrivate from "@/utils/axiosPrivate";
import axios from "axios";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ style: "italic", subsets: ["latin"] });

async function getLaureat(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/laureate/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Laureat({ params }: { params: { id: string } }) {
  const laureate = (await getLaureat(params.id))[0] as NobelLaureate;

  return (
    <div className="h-screen bg-gray-100 flex-col justify-center items-start pt-8  px-16">
      <div className="max-w-5xl text-stone-600 bg-white p-8 rounded-lg shadow-sm mx-auto">
        <h1 className="text-3xl font-bold mb-4">{laureate.knownName.en}</h1>
        <p className="text-lg text-gray-600 mb-4">
          Birth Date: {laureate.birth.date}
        </p>
        {laureate.birth.place && (
          <p className="text-lg text-gray-600 mb-4">
            Birth Place:
            {laureate.birth.place.city.en}, {laureate.birth.place.country.en}
          </p>
        )}

        <div className="mt-10">
          {laureate.nobelPrizes.map((prize, i) => (
            <div className="mb-2" key={`prize_${i}`}>
              <p>
                The Nobel prices in {prize.category.en} {prize.awardYear}{" "}
              </p>

              <div className="w-2/3 border-b mb-4 mt-1" />
              <p className={openSans.className}>
                &quot;{prize.motivation.en}&quot;
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-12 mt-12">
          <a
            href={laureate.wikipedia.english}
            className="text-blue-600 hover:underline mr-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More on Wikipedia
          </a>
          <a
            href={laureate.wikidata.url}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More on Wikidata
          </a>
        </div>
      </div>
      <CommentSection laureateId={laureate.id} />
    </div>
  );
}
