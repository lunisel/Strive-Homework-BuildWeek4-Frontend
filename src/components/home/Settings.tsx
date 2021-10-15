import { useState, useRef } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { FaCamera } from "react-icons/fa";
import { useSelector } from "react-redux";
import { reduxStateInt, UserInt } from "../../usefull/interfaces";
import "./styles.css";
import Sidebar from "./Sidebar";

const Settings = () => {
  const [settings, setSettings] = useState<boolean>(true);

  const inputFile = useRef<any>(null)

  const user: UserInt | null = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  const changeImg = () => {
   inputFile.current.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files![0].name);
  };

  return (
    <>
      {settings ? (
        <>
          <div className="top-bar-settings">
            <HiArrowLeft
              className="arrow-icon-setting"
              onClick={() => setSettings(!settings)}
            />
            <span className="profile-setting-span">Profile</span>
          </div>
          <div className="img-settings-cont">
            <img
              src={user!.avatar}
              alt="profile"
              className="w-50 h-auto rounded-circle"
            />
            <div className="hover-img-cont" onClick={() => changeImg()}>
            <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={(e : React.ChangeEvent<HTMLInputElement>)=> handleFileUpload(e)}/>
              <img
                src="https://placehold.it/100x100"
                alt="profile"
                className="h-100 w-auto rounded-circle"
              />
              <div className="hover-change-pic">
                <FaCamera className="camera-icon" />
                <span className="change-pic-text">
                  Change your profile picture
                </span>
              </div>
            </div>
          </div>
          <div className="other-fields-cont">
            <div className="inputs-container">
              <span className="inputs-label">Your full name</span>
              <input type="text" value={user!.name} placeholder={user!.name} className="input-field" />
            </div>

            <div className="inputs-container">
              <span className="inputs-label">Your email</span>
              <input type="text" value={user!.email} placeholder={user!.email} className="input-field" />
            </div>

            <div className="inputs-container">
              <span className="inputs-label">Your status</span>
              <input type="text" value={user!.status} placeholder={user!.status} className="input-field" />
            </div>
          </div>
        </>
      ) : (
        <Sidebar />
      )}
    </>
  );
};

export default Settings;
