import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="container pt-24 flex flex-col ">
      <ul className="list-disc flex  justify-around">
        <div>
          <div>
            <img
              className="border rounded-full object-cover max-h-[300px] "
              src={
                user?.image
                  ? `https://mustafocoder.pythonanywhere.com/api${user.image}`
                  : "https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
              }
              alt="image"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 ">
          <div className="font-bold text-lg">
            Username: <i className="">{user?.username}</i>
          </div>
          <div className="font-bold text-lg ">
            Gender: <i>{user?.gender}</i>
          </div>
          <div className="font-bold text-lg">
            Email: <i>{user?.email}</i>
          </div>
          <div className="font-bold text-lg">
            Name: <i>{user?.name}</i>
          </div>
          <div className="font-bold text-lg">
            Age: <i>{user?.age}</i>
          </div>
        </div>
      </ul>
      <Link
        to="/update-profile "
        className="border border-slate-100 text-center p-2 max-w-52 mt-16 bg-yellow-300 rounded-xl"
      >
        <i className="fa fa-pencil p-2"></i>Update Profile
      </Link>
    </div>
  );
};

export default Profile;
