import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [apiData, setApiData] = useState([]);

  const getData = async () => {
    const api = await axios.get(
      "https://picsum.photos/v2/list?page=2&limit=10",
    );
    const dataFile = api.data;
    setApiData(dataFile);
    console.log(apiData);
  };
  let uiChange = "loading...";

  if (apiData.length >= 0) {
    uiChange = apiData.map((e, i) => {
      return (
        <div>
          <div key={i} className="h-40 w-44 rounded-lg overflow-hidden">
            <img className=" h-full w-full object-cover" src={e.download_url} />
          </div>
          <h2 className="">{e.author}</h2>
        </div>
      );
    });
  }

  return (
    <div
      onClick={getData}
      className="h-screen w-full text-white bg-black overflow-auto"
    >
      <div className="flex flex-wrap gap-5"> {uiChange}</div>
    </div>
  );
};

export default App;
