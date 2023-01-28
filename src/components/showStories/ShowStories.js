import React, { useEffect } from "react";
import Stories from "react-insta-stories";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchStories } from "../../redux/slices/storiesSlice";
import "./ShowStories.scss";

function ShowStories() {
  const stories = useSelector((state) => state.storiesReducer.showStories);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(params?.storiesId);
    dispatch(
      fetchStories({
        storiesId: params?.storiesId,
      })
    );
  }, [params?.storiesId, dispatch]);

  return (
    <div className="ShowStories">
      <div className="story-container">
        {stories && stories.length>0 && (
          <Stories
            className="story"
            width="100%"
            height="100%"
            // keyboardNavigation={true}
            stories={stories}
          />
        )}
      </div>
    </div>
  );
}

export default ShowStories;
