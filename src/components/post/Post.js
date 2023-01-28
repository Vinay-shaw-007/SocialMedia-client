import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsChat, BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { TOAST_SUCCESS } from "../../App";
import {
  setOpenOptions,
  setPostId,
  showToast
} from "../../redux/slices/appConfigSlice";
import {
  likeAndUnlikePost
} from "../../redux/slices/postsSlice";
import Avatar from "../avatar/Avatar";
import "./Post.scss";

function Post({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editCaption, setEditCaption] = useState("");
  const [enable, setEnable] = useState(false);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [isMyPost, setIsMyPost] = useState(false);

  useEffect(() => {
    setIsMyPost(myProfile?._id === post?.owner?._id);
  }, [myProfile?._id, post?.owner?._id, dispatch]);

  function handlePostLiked() {
    console.log(post.isLiked);
    let message;
    message = post.isLiked ? "Unliked" : "Liked";
    dispatch(
      showToast({
        type: TOAST_SUCCESS,
        message,
      })
    );
    dispatch(
      likeAndUnlikePost({
        postId: post?._id,
      })
    );
  }

  function handleEditPostSubmit() {
    setEnable(!enable);
    dispatch(setOpenOptions(true));

    dispatch(setPostId(post?._id));
  }

  return (
    <div className="Post">
      <div
        className="heading"
        onClick={() => navigate(`/profile/${post?.owner?._id}`)}>
        <div className="profile-logo-name">
          <Avatar src={post?.owner?.avatar?.url} />
          <h4>{post?.owner?.name}</h4>
        </div>
        {isMyPost && (
          <BsThreeDots onClick={handleEditPostSubmit} />
        )}
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="" />
      </div>
      <div className="footer">
        <div className="like-comment">
          <div className="like">
            {post?.isLiked ? (
              <AiFillHeart
                style={{ color: "red" }}
                className="icon"
                onClick={handlePostLiked}
              />
            ) : (
              <AiOutlineHeart className="icon" onClick={handlePostLiked} />
            )}

            <h4>{`${post?.likesCount} likes`}</h4>
          </div>
          <BsChat
            className="comment-icon"
            onClick={() => navigate(`/comment/${post?._id}`)}
          />
        </div>
        <p className="caption">{post?.caption}</p>
        <p
          className="total-comments"
          onClick={() =>
            navigate(`/comment/${post?._id}`)
          }>{`View all ${post?.commentsCount} Comments`}</p>
        <div className="timeAndDelete">
          <h6 className="time-ago">{post?.timeAgo}</h6>
        </div>
      </div>
    </div>
  );
}

export default Post;
