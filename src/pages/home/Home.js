import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getMyInfo, setOpenOptions } from "../../redux/slices/appConfigSlice";
import "./Home.scss";
import Option from "../../components/option/Option";

function Home() {
  const isOptionOpen = useSelector(
    (state) => state.appConfigReducer.openOption
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyInfo());
  }, [dispatch]);
  function handleOptionClick() {
    dispatch(setOpenOptions(false))
  }
  return (
    <>
      {isOptionOpen && <Option onClose={handleOptionClick} />}
      <div className="Home">
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Home;
