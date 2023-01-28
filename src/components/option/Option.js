import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TOAST_FAILURE } from "../../App";
import { showToast } from "../../redux/slices/appConfigSlice";
import { deletePost, updatePost } from "../../redux/slices/postsSlice";
import { axiosClient } from "../../utils/axiosClient";
import "./Option.scss";

function Option({ onClose }) {
  const postId = useSelector((state) => state.appConfigReducer.postId);
  const dispatch = useDispatch();
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [editCaption, setEditCaption] = useState("");

  function handleDeleteClick() {
    dispatch(
      deletePost({
        postId: postId,
      })
    );
    onClose();
  }

  async function handleCaptionSubmit() {
    try {
      dispatch(
        updatePost({
          postId: postId,
          caption: editCaption,
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditClicked(false);
      onClose();
    }
  }

  function handleEditClick() {
    setIsEditClicked(true);
  }

  return (
    <div className="Option">
      <div className="overlay" onClick={onClose}></div>
      <div className="option-container">
        <div className="report border-bottom" onClick={handleDeleteClick}>
          <p>Delete</p>
        </div>
        <div className="edit border-bottom" onClick={handleEditClick}>
          <p>Edit</p>
        </div>
        <div className="hide-like border-bottom">
          <p>Hide like count</p>
        </div>
        <div className="turn-off-comments border-bottom">
          <p>Turn off commenting</p>
        </div>
        <div className="go-to-post border-bottom">
          <p>Go to post</p>
        </div>
        <div className="cancel" onClick={onClose}>
          <p>Cancel</p>
        </div>
        {isEditClicked && (
          <div className="caption-container">
            <div className="edit-post-container">
              <div className="input-comment">
                <input
                  value={editCaption}
                  type="text"
                  onChange={(e) => setEditCaption(e.target.value)}
                  placeholder="Edit Your Caption"
                />
              </div>
              <div className="submit-comment">
                <p onClick={handleCaptionSubmit}>Save</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Option;
