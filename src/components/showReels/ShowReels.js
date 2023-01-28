import React, { useEffect, useRef, useState } from "react";
import { axiosClient } from "../../utils/axiosClient";
import Reel from "../reel/Reel";
import "./ShowReels.scss";

function ShowReels() {
  const [reelsData, setReelsData] = useState([]);


  async function fetchReelsData() {
    const response = await axiosClient.get("/reels/getReelsData");
    setReelsData(response.result.reelsData);
  }

  useEffect(() => {
    fetchReelsData();
  }, []);

  useEffect(() => {}, [reelsData]);
  return (
    <div className="ShowReels">
      <div className="video-container">
        {reelsData.map((singleUserReels) =>
          singleUserReels.reels.map((reel) => (
            <Reel key={reel._id} reel={reel} />
          ))
        )}
      </div>
    </div>
  );
}

export default ShowReels;
