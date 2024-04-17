import { NobelLaureate } from "@/models/NobelLaureat";
import { Open_Sans } from "next/font/google";
import Link from "next/link";

const openSans = Open_Sans({ style: "italic", subsets: ["latin"] });

type props = Pick<NobelLaureate, "id" | "knownName" | "birth" | "nobelPrizes">;

const LaureateCard = ({ id, knownName, birth, nobelPrizes }: props) => {
  return (
    <Link href={`/laureats/${id}`}>
      <div
        className="min-w-[220px] text-stone-800 cursor-pointer rounded-lg border bg-white py-4 px-6
       transition duration-200 ease-out hover:opacity-90 hover:shadow-lg"
      >
        <div className="flex flex-row items-baseline justify-between mb-2">
          <h5 className="text-lg">{knownName?.en}</h5>

          <p className="text-xs">{birth?.date}</p>
        </div>
        <div>
          {nobelPrizes.map((prize, i) => (
            <div className="mb-2" key={`prize_${i}`}>
              <p>
                The Nobel prices in {prize.category.en} {prize.awardYear}{" "}
              </p>

              <div className="w-2/3 border-b mb-2" />
              <p className={openSans.className}>
                &quot;{prize.motivation.en}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default LaureateCard;
