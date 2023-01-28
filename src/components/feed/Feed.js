import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedData } from "../../redux/slices/feedSlice";
import Follower from "../follower/Follower";
import Post from "../post/Post";
import Stories from "../stories/Stories";
import "./Feed.scss";

function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  console.log('feedData', feedData);
  useEffect(() => {
    dispatch(getFeedData());
  }, [dispatch]);
  return (
    <div className="Feed">
      <div className="container">
        <div className="left-part">
          <Stories />
          {feedData?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        <div className="right-part">
          <div className="following">
            <h3 className="title">Your are following</h3>
            {feedData?.followings?.map((user) => (
              <Follower key={user?._id} user={user} />
            ))}
          </div>

          <div className="suggestions">
            <h3 className="title">Suggestions for you</h3>
            {feedData?.suggestions?.map((user) => (
              <Follower key={user?._id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
