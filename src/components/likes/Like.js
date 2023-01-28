import React from "react";
import { useNavigate } from "react-router";
import Avatar from "../avatar/Avatar";
import './Like.scss'

function Like({ user }) {
  const navigate = useNavigate();
  return (
    <div className="Like">
      <div
        className="user-info"
        onClick={() => navigate(`/profile/${user?._id}`)}>
        <Avatar src={user?.avatar?.url} />
        <h4 className="name">{user?.name}</h4>
      </div>
    </div>
  );
}

export default Like;
