import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getSpecificPostDetails } from "../../redux/slices/postsSlice";
import CommentPost from "../commentPost/CommentPost";
import Like from "../likes/Like";
import "./Comment.scss";
import ShowAllComments from "../showAllComments/ShowAllComments";

function Comment() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postsReducer.specificPostDetails);
  const params = useParams();


  useEffect(() => {
    try {
      dispatch(
        getSpecificPostDetails({
          postId: params.postId,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [params.postId, dispatch]);
  return (
    <div className="Comment">
      <div className="container">
        <div className="left-part-comment">
          <CommentPost post={post} />
          <div className="all-comments">
            <h4 className="comments-heading">ALL COMMENTS</h4>
           {post?.commentDetails?.map((details, i) => <ShowAllComments key={i} userId={details.commentsUserId} comment={details.comments}/>)}
          </div>
        </div>
        <div className="right-part-comment">
          <div className="total-likes">
            <h4 className="likes">Likes</h4>
            {post?.likes?.map((post) => (
              <Like key={post?._id} user={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
