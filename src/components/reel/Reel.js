import React, { useRef, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import {
  BsBookmark, BsChat, BsHeart, BsThreeDots
} from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import "./Reel.scss";

function Reel({ reel }) {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  function handleVideoClick() {
    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsVideoPlaying(!isVideoPlaying);
  }
  return (
    <div className="Reel">
      <div className="reel-container">
        <video
          className="video-player"
          ref={videoRef}
          onClick={handleVideoClick}
          src={reel?.url}
          loop
        />
        <div className="show-options">
          <BsHeart />
          <BsChat />
          <FiSend />
          <BsBookmark />
          <BsThreeDots />
        </div>
        {!isVideoPlaying && (
          <div onClick={handleVideoClick} className="play-btn">
            <AiFillPlayCircle />
          </div>
        )}
        <div className="show-views">
          <FaPlay /> 345
        </div>
      </div>
    </div>
  );
}

export default Reel;
