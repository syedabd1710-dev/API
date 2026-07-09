import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [apiData, setApiData] = useState([]);
  const [ind, setInd] = useState(1);
const pageChangerNext = () => {
  if (ind < 15) {
    setInd((prev) => prev + 1);
   
  }
 
};

const pageChangerPrev = () => {
  if (ind > 1) {
    setInd((prev) => prev - 1);
   
  }}
  const getData = async () => {
    const api = await axios.get(
      `https://picsum.photos/v2/list?page=${ind}&limit=30`,
    );
    const dataFile = api.data;
    setApiData(dataFile);
  };
  useEffect(
    function () {
      getData();
    },
    [ind]
  );

  let uiChange = "loading...";

  if (apiData.length >= 0) {
    uiChange = apiData.map((e, i) => {
      return (
        <div key={i}>
          <a href={e.url} target="_blank">
            <div className="h-45 w-50 rounded-lg overflow-hidden bg-gray-500 shadow-[0_0_15px_white]">
              <img
                className=" h-full w-full object-cover"
                src={e.download_url}
                 alt={e.author}
              />
            </div>
          </a>
          <h2 className="text-2xl font-bold mt-3 [text-shadow:0_0_10px_yellow]">{e.author}</h2>
        </div>
      );
    });
  }

  return (
    <div className="h-screen w-full justify-center items-center text-white bg-black overflow-auto py-8 px-2">
      <div className="flex w-full justify-around flex-wrap gap-5 jus items-center">
        {uiChange}
      </div>
      <div className="w-full flex justify-center items-center h-15 gap-7 mt-6 text-xl ">
        <button
          onClick={pageChangerPrev}
      className={`px-3.5 py-1.5 rounded-full ${
    ind === 1 ? " opacity-50 bg-amber-600 cursor-not-allowed ": "bg-amber-600 active:scale-95 hover:scale-108 hover:bg-amber-400 transition duration-400 shadow-[0_0_10px_yellow]  cursor-pointer"
  }`}
        >
          {"<"}
        </button>
         <h3 className="text-2xl font-bold">Page {ind}</h3>
        <button
          onClick={pageChangerNext}
          className={`px-3.5 py-1.5 rounded-full ${
    ind === 15 ? " opacity-50 bg-amber-600 cursor-not-allowed ": "bg-amber-600 active:scale-95 hover:scale-108 hover:bg-amber-400 transition duration-400 shadow-[0_0_10px_yellow]  cursor-pointer"
  }`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default App;
