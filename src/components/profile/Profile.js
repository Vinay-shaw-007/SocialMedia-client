import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getUserProfile } from "../../redux/slices/postsSlice";
import Tablayout from "../tablayout/Tablayout";
import "./Profile.scss";
import ProfileSection from "./profileSection/ProfileSection";

function Profile() {
  const userProfile = useSelector((state) => state.postsReducer.userProfile);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(false);
  const feedData = useSelector((state) => state.feedDataReducer.feedData);

  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      })
    );
    setIsFollowing(
      feedData?.followings?.find((item) => item._id === params.userId)
    );
    setIsMyProfile(myProfile?._id === params.userId);
  }, [myProfile, params.userId, feedData, dispatch]);

  return (
    <div className="Profile">
      <div className="container">
        <div className="left-part">
          <ProfileSection
            userProfile={userProfile}
            isMyProfile={isMyProfile}
            isFollowing={isFollowing}
          />
          <div className="posts-reels-container">
            <Tablayout userProfile={userProfile} reels={userProfile?.reelId?.reels}/>
            {/* {userProfile?.posts?.map((post) => (
              <Post key={post._id} post={post} />
            ))} */}
          </div>
        </div>
        {/* <div className="right-part">
          <div className="profile-card">
            <img className="user-img" src={userProfile?.avatar?.url} alt="" />
            <h3 className="user-name">{userProfile?.name}</h3>
            <p className="bio">{userProfile?.bio}</p>
            <div className="follower-info">
              <h4>{`${userProfile?.followers?.length} Followers`}</h4>
              <h4>{`${userProfile?.followings?.length} Followings`}</h4>
            </div>
            {!isMyProfile && (
              <h5
                style={{ marginTop: "10px" }}
                onClick={handleUserFollow}
                className={
                  isFollowing ? "hover-link follow-link" : "btn-primary"
                }>
                {isFollowing ? "Unfollow" : "Follow"}
              </h5>
            )}
            {isMyProfile && (
              <button
                className="update-profile btn-secondary"
                onClick={() => {
                  navigate("/updateProfile");
                }}>
                Update Profile
              </button>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Profile;
