import React from "react";
import { AiOutlineInstagram, AiOutlineLogout } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";
import Avatar from "../avatar/Avatar";
import homeIcon from "../../assests/home.svg";
import searchIcon from "../../assests/search.svg";
import exploreIcon from "../../assests/navigation.svg";
import reelsIcon from "../../assests/reel-icon.svg";
import messageIcon from "../../assests/message-icon.svg";
import notificationIcon from "../../assests/like-icon.svg";
import createIcon from "../../assests/create-icon.svg";
import hamburgerIcon from "../../assests/ham-icon.svg";
import appIcon from "../../assests/instagram.svg";
import "./Navbar.scss";
import { TOAST_SUCCESS } from "../../App";
import { showToast } from "../../redux/slices/appConfigSlice";
import CreatePost from "../createPost/CreatePost";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  console.log("under Navbar ", myProfile);

  function handleWorkInProgress() {
    dispatch(
      showToast({
        type: TOAST_SUCCESS,
        message: "Work In Progress",
      })
    );
  }

  function handleCreateClicked() {
    navigate("/createPost");
  }

  return (
    <div className="Navbar">
      <div className="navBar-container">
        {/* app icon layout */}
        <h2 className="banner hover-link" onClick={() => navigate("/")}>
          <AiOutlineInstagram className="app-icon" />
          <img src={appIcon} alt="" />
        </h2>

        {/* main options layout */}
        <div className="main-menu">
          <div
            className="home flex hover-link resize-icon"
            onClick={() => navigate("/")}>
            <img src={homeIcon} alt="" />
            <p>Home</p>
          </div>

          <div
            className="search flex hover-link resize-icon"
            onClick={handleWorkInProgress}>
            <img src={searchIcon} alt="" />
            <p>Search</p>
          </div>

          <div
            className="explore flex hover-link resize-icon"
            onClick={handleWorkInProgress}>
            <img src={exploreIcon} alt="" />
            <p>Explore</p>
          </div>

          <div
            className="reels flex hover-link resize-icon"
            onClick={() => navigate(`/reels`)}>
            <img src={reelsIcon} alt="" />
            <p>Reels</p>
          </div>

          <div
            className="message flex hover-link resize-icon"
            onClick={handleWorkInProgress}>
            <img src={messageIcon} alt="" />
            <p>Messages</p>
          </div>

          <div
            className="notification flex hover-link resize-icon"
            onClick={handleWorkInProgress}>
            <img src={notificationIcon} alt="" />
            <p>Notification</p>
          </div>

          <div
            className="create flex hover-link resize-icon"
            onClick={handleCreateClicked}>
            <img src={createIcon} alt="" />
            <p>Create</p>
          </div>

          <div
            className="profile flex hover-link resize-icon"
            onClick={() => navigate(`/profile/${myProfile?._id}`)}>
            <div className="avatar">
              <Avatar src={myProfile?.avatar?.url} />
            </div>
            <p>Profile</p>
          </div>

          {/* <div className="logout hover-link" onClick={handleLogoutClicked}>
            <AiOutlineLogout />
          </div> */}
        </div>

        {/* more options layout */}
        <div
          className="more-options hover-link resize-icon"
          onClick={handleWorkInProgress}>
          <img src={hamburgerIcon} alt="" />
          <p>More</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
