import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getSpecificPostDetails } from "../../redux/slices/postsSlice";
import { axiosClient } from "../../utils/axiosClient";
import Avatar from "../avatar/Avatar";
import "./CommentPost.scss";

function CommentPost({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  async function handleCommentSubmit() {
    try {
      await axiosClient.post("/posts/postComment", {
        postId: post._id,
        comment,
      });
      dispatch(
        getSpecificPostDetails({
          postId: post._id,
        })
      );
      setComment("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="CommentPost">
      <div
        className="heading"
        onClick={() => navigate(`/profile/${post?.owner?._id}`)}>
        <Avatar src={post?.owner?.avatar?.url} />
        <h4>{post?.owner?.name}</h4>
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="" />
      </div>
      <div className="footer">
        <div className="input-comment" onSubmit={handleCommentSubmit}>
          <input
            value={comment}
            type="text"
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add Comment"
          />
        </div>
        <div className="submit-comment">
          <p onClick={handleCommentSubmit}>Post</p>
        </div>
      </div>
    </div>
  );
}

export default CommentPost;
