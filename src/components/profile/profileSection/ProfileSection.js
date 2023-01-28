import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import settingIcon from "../../../assests/setting_icon.svg";
import dummyUserImg from "../../../assests/user.png";
import { followAndUnfollowUser } from "../../../redux/slices/feedSlice";
import { axiosClient } from "../../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../../utils/localStorageManager";
import "./ProfileSection.scss";

function ProfileSection({ userProfile, isMyProfile, isFollowing }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState();
  const [userTotalPost, setUserTotalPost] = useState();
  const [userFollowers, setUserFollowers] = useState();
  const [userFollowings, setUserFollowings] = useState();
  const [userImg, setUserImg] = useState();
  const [userBio, setUserBio] = useState();

  useEffect(() => {
    setUserName(userProfile?.name || "");
    setUserTotalPost(userProfile?.posts?.length || 0);
    setUserFollowers(userProfile?.followers?.length || 0);
    setUserFollowings(userProfile?.followings?.length || 0);
    setUserImg(userProfile?.avatar?.url || dummyUserImg);
    setUserBio(userProfile?.bio || "");
  }, [userProfile]);

  function handleUserFollow() {
    dispatch(
      followAndUnfollowUser({
        userIdToFollow: userProfile?._id,
      })
    );
  }

  async function handleLogoutClicked() {
    try {
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="ProfileSection">
      <div className="container">
        <div className="left_part">
          <img src={userImg} alt="" />
        </div>
        <div className="right_part">
          <div className="top-info">
            <h3>{userName}</h3>
            {isMyProfile && (
              <div className="edit-logout-btn">
                <button
                  className="edit-profile"
                  onClick={() => navigate("/updateProfile")}>
                  Edit Profile
                </button>
                <button className="logout" onClick={handleLogoutClicked}>
                  Logout
                </button>
              </div>
            )}
            {!isMyProfile && (
              <button className="edit-profile" onClick={handleUserFollow}>
                {isFollowing ? "Following" : "Follow"}
              </button>
            )}
            <img src={settingIcon} alt="" />
          </div>

          <div className="middle-info">
            <div className="total-post">
              <p>
                <strong>{userTotalPost}</strong> Posts
              </p>
            </div>
            <div className="total-followers">
              <p>
                <strong>{userFollowers}</strong> Followers
              </p>
            </div>
            <div className="total-followings">
              <p>
                <strong>{userFollowings}</strong> Followings
              </p>
            </div>
          </div>

          <div className="bottom-info">
            <p>{userBio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
