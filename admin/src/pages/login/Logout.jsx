import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Logout = async (e) => {
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  try {
    const res = await axios.post("/auth/logout");
    if (res) {
      dispatch({ type: "LOGOUT_SUCCESS" });

      navigate("/");
    } else {
      dispatch({
        type: "LOGOUT_FAILURE",
        payload: { message: "You are not allowed!" },
      });
    }
  } catch (err) {
    dispatch({ type: "LOGOUT_FAILURE", payload: err.response.data });
  }
};

export default Logout;
