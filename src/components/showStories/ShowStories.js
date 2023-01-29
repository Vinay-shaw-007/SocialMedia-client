import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import Stories from "react-insta-stories";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { deleteStories, fetchStories } from "../../redux/slices/storiesSlice";
import "./ShowStories.scss";

function ShowStories() {
  const stories = useSelector((state) => state.storiesReducer.showStories);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [isMyStory, setIsMyStory] = useState(false);

  useEffect(() => {
    setIsMyStory(myProfile?.storiesId === params?.storiesId);
    dispatch(
      fetchStories({
        storiesId: params?.storiesId,
      })
    );
  }, [params?.storiesId, dispatch]);

  function deleteStory() {
    try {
      dispatch(
        deleteStories({
          storiesId: params?.storiesId,
        })
      );
    } catch (e) {
      console.log(e);
    } finally {
      navigate(-1);
    }
  }

  return (
    <div className="ShowStories">
      <div className="story-container">
        {stories && stories.length > 0 && (
          <Stories
            className="story"
            width="100%"
            height="100%"
            keyboardNavigation={true}
            stories={stories}
          />
        )}
      </div>
      <div className="close-btn" onClick={() => navigate(-1)}>
        <AiOutlineClose />
      </div>
      {isMyStory && (
        <div className="delete-story-btn" onClick={deleteStory}>
          <FaTrash />
        </div>
      )}
    </div>
  );
}

export default ShowStories;
