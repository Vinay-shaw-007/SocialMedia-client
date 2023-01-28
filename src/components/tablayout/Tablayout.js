import React from "react";
import "./Tablayout.scss";
import { Tabs } from "antd";
import Post from "../post/Post";
import Reel from "../reel/Reel";
function Tablayout({ userProfile, reels }) {
  const items = [
    {
      label: "Posts",
      key: 1,
      children: (
        <div className="showPosts">
          {userProfile?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      ),
    },
    {
      label: "Reels",
      key: 2,
      children: (
        <div className="showReels">
          {reels?.map((reel) => <Reel key={reel._id} reel={reel}/>)}
          {/* <Reel />
          <Reel />
          <Reel />
          <Reel />
          <Reel /> */}
        </div>
      ),
    },
  ];
  return (
    <div className="Tablelayout">
      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
}

export default Tablayout;
