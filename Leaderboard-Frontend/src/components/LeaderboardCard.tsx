import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";

let colors: string[] = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-pink-500",
  "bg-green-500",
  "bg-violet-500",
  "bg-fuchsia-600",
  "bg-purple-800",
  "bg-emerald-500",
  "bg-rose-500",
];

interface Teams {
  TeamNumber: number;
  Name: string;
  Points: number;
  Credits: number;
}

function LeaderboardCard() {
  const [data, setdata] = useState([] as any);

  useEffect(() => {
    const interval = setInterval(() => {fetchDetails();}, 2000);
    return () => {
      clearInterval(interval);
    }
  }, []);
  

  const fetchDetails = async () => {
    const url = "http://192.168.0.107:8000/leaderboard/";
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const result : Array<Teams> = await response.json();
      console.log(result);
      setdata(result.sort((a , b) => b.Points - a.Points));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Reorder.Group as="table" className="table-fixed" axis="y" values={data} onReorder={setdata}>
      <thead>
        <tr className="flex justify-between ml-5 mr-4">
          <th className="font-semibold text-xl font-poppins">Rank</th>
          <th className="font-semibold text-xl font-poppins w-full">Team name</th>
          <th className="font-semibold text-xl font-poppins w-36 mr-5">Credits</th>
          <th className="font-semibold text-xl font-poppins w-36">Score</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e: Teams, index: number) => (
          <Reorder.Item
            as="tr"
            value={e}
            key={e.TeamNumber}
            className={`${
              colors[index % 10]
            } rounded-full flex my-4 text-white`}
          >
            <td className="w-24 h-20 flex justify-center items-center">
              {index === 0 && (
                <div className="w-12 h-12 mx-5 rounded-[50%] flex justify-center items-center text-2xl font-bold">
                  <img
                    className="scale-125"
                    src="https://png.pngtree.com/png-vector/20220731/ourmid/pngtree-gold-medal-1st-place-award-icon-png-image_6093703.png"
                    alt="first"
                  />
                </div>
              )}
              {index === 1 && (
                <div className="w-12 h-12 mx-5 rounded-[50%] flex justify-center items-center text-2xl font-bold">
                  <img
                    className="scale-125"
                    src="https://png.pngtree.com/png-vector/20220731/ourmid/pngtree-silver-medal-2nd-place-award-icon-png-image_6093704.png"
                    alt="second"
                  />
                </div>
              )}
              {index === 2 && (
                <div className="w-12 h-12 mx-5 rounded-[50%] flex justify-center items-center text-2xl font-bold">
                  <img
                    className="scale-125"
                    src="https://png.pngtree.com/png-vector/20220731/ourmid/pngtree-3rd-place-bronze-medal-award-icon-png-image_6093735.png"
                    alt="third"
                  />
                </div>
              )}
              {index != 0 && index != 1 && index != 2 && (
                <div className="w-12 h-12 mx-5 rounded-[50%] flex justify-center items-center text-2xl font-bold">
                  {/* <img
                  className="scale-125 rounded-full"
                  src={e.thumbnails}
                  alt="third"
                /> */}
                  {index + 1}
                </div>
              )}
            </td>
            <td className="flex justify-start items-center w-full sm:min-w-[230px] lg:min-w-[230px] sm:pl-16 md:pl-28 ">
              <div className="flex flex-col text-left">
                <span className="font-bold text-xl">{e.Name}</span>
                <span className="font-semibold text-lg">{""}</span>
              </div>
            </td>
            <td className="flex items-center w-36 mr-5 text-2xl text-white font-bold">
              {e.Credits}
            </td>
            <td className="flex justify-around items-center w-36 mr-5 text-2xl text-white font-bold">
              {e.Points}
            </td>
          </Reorder.Item>
        ))}
      </tbody>
    </Reorder.Group>
  );
}

export default LeaderboardCard;
