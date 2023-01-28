import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import dummyImg from "../../assests/user.png";
import { uploadStories } from "../../redux/slices/storiesSlice";
import "./Stories.scss";

function Stories() {
  let currentScrollPosition = 0;
  let scrollAmount = 320;
  const [stories, setStories] = useState([]);
  const storiesContainerRef = useRef(null);
  const horizontalScrollRef = useRef(null);
  const btnScrollLeftRef = useRef("");
  const btnScrollRightRef = useRef("");
  const [userImg, setUserImg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const feedData = useSelector((state) => state.feedDataReducer.feedData);

  useEffect(() => {
    setUserImg(feedData?.avatar?.url || dummyImg);
  }, [feedData]);

  let maxScroll =
    horizontalScrollRef?.current?.offsetWidth -
    storiesContainerRef?.current?.offsetWidth;

  function scrollHorizontally(val) {
    currentScrollPosition += val * scrollAmount;
    if (currentScrollPosition > 0) {
      currentScrollPosition = 0;
    }

    if (currentScrollPosition < maxScroll) {
      currentScrollPosition = maxScroll;
    }
    storiesContainerRef.current.style.left = currentScrollPosition + "px";
  }

  useEffect(() => {
    if (stories.length > 0) {
      dispatch(
        uploadStories({
          stories,
        })
      );
    }
  }, [stories, dispatch]);

  const handleCreateStoriesClick = async (event) => {
    const files = event.target.files;
    const selectedFilesArray = Array.from(files);
    const readPromises = selectedFilesArray.map(async (file) => {
      const fileReader = new FileReader();
      return new Promise((resolve, reject) => {
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = reject;
      });
    });
    const imagesArray = await Promise.all(readPromises);
    setStories(imagesArray);
  };

  function handleStoriesClick(data) {
    navigate(`/stories/${data}`);
  }

  return (
    <div className="Stories">
      <div className="container">
        <div ref={horizontalScrollRef} className="horizontal-scroll">
          <button
            id="btn-sroll-left"
            className="btn-scroll"
            ref={btnScrollLeftRef}
            onClick={() => scrollHorizontally(1)}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            id="btn-sroll-right"
            className="btn-scroll"
            ref={btnScrollRightRef}
            onClick={() => scrollHorizontally(-1)}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <div ref={storiesContainerRef} className="stories-container">
            <div className="story-userName">
              <label htmlFor="storiesImg" className="current-user-story-input">
                <img src={userImg} alt="" />
                <i className="fa-solid fa-plus add-icon"></i>
              </label>
              <input
                style={{ display: "none" }}
                id="storiesImg"
                type="file"
                accept="image/*"
                multiple
                onChange={handleCreateStoriesClick}
              />
              <p>Create Story</p>
            </div>

            {feedData?.followerStories?.map((storiesData) => (
              <div
                key={storiesData?._id}
                onClick={() => handleStoriesClick(storiesData?.owner?.storiesId)}
                className="story-userName">
                <div className="story-circle">
                  <img src={storiesData?.owner?.avatar?.url} alt="squirel" />
                </div>
                <p>{storiesData?.owner?.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stories;
