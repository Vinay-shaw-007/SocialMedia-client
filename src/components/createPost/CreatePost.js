import React, { useRef, useState } from "react";
import { BsCameraReels, BsCardImage } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { TOAST_FAILURE, TOAST_SUCCESS } from "../../App";
import { showToast } from "../../redux/slices/appConfigSlice";
import { getUserProfile } from "../../redux/slices/postsSlice";
import { axiosClient } from "../../utils/axiosClient";
import Avatar from "../avatar/Avatar";
import "./CreatePost.scss";

function CreatePost() {
  const [postImg, setPostImg] = useState("");
  const [postVideo, setPostVideo] = useState("");
  const [caption, setCaption] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  const handleImageChange = (e) => {
    setPostVideo("");
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        const size = (fileReader.result.length / (1024 * 1024)).toFixed(2);
        if (size < 10) {
          setPostImg(fileReader.result);
        } else {
          dispatch(
            showToast({
              type: TOAST_FAILURE,
              message: "File should be less than 10MB",
            })
          );
        }
      }
    };
  };

  function handleVideoChange(e) {
    setPostImg("");
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        const size = (fileReader.result.length / (1024 * 1024)).toFixed(2);
        if (size < 10) {
          setPostVideo(fileReader.result);
        } else {
          dispatch(
            showToast({
              type: TOAST_FAILURE,
              message: "File should be less than 10MB",
            })
          );
        }
      }
    };
  }

  const handlePostSubmit = async () => {
    try {
      if (postImg === "") {
        return dispatch(
          showToast({
            type: TOAST_FAILURE,
            message: "Image is required",
          })
        );
      }
      if (postVideo === "") {
        return dispatch(
          showToast({
            type: TOAST_FAILURE,
            message: "Video is required",
          })
        );
      }
      if (caption === "") {
        return dispatch(
          showToast({
            type: TOAST_FAILURE,
            message: "Caption is required",
          })
        );
      }
      {
        postImg &&
          (await axiosClient.post("/posts", {
            caption,
            postImg,
          }));
      }

      {
        postVideo &&
          (await axiosClient.post("/reels", {
            caption,
            postReel: postVideo,
          }));
      }
    } catch (e) {
      console.log("post error", e);
    } finally {
      setCaption("");
      setPostVideo("");
      setPostImg("");
    }
  };

  function handleVideoClick() {
    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsVideoPlaying(!isVideoPlaying);
  }

  return (
    <div className="CreatePost">
      <div className="left-part1">
        <Avatar src={myProfile?.avatar?.url} />
      </div>
      <div className="right-part">
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value || "")}
          type="text"
          placeholder="What's on Your mind?"
          className="captionInput"
        />
        {postImg && (
          <div className="img-container">
            <img className="post-img" src={postImg} alt="post Img" />
          </div>
        )}
        {postVideo && (
          <div className="video-container">
            <video
              className="post-video"
              ref={videoRef}
              onClick={handleVideoClick}
              src={postVideo}></video>
          </div>
        )}
        <div className="bottom-part">
          <div className="input-post-img">
            <div className="input-image-video">
              <label htmlFor="inputImg" className="labelImg">
                <BsCardImage />
              </label>
              <label htmlFor="inputVideo" className="labelVideo">
                <BsCameraReels />
              </label>
            </div>

            <input
              className="inputImg"
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <input
              className="inputVideo"
              id="inputVideo"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
            />
          </div>
          <button className="post-btn btn-primary" onClick={handlePostSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
