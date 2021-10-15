import { useState, useRef } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { FaCamera } from "react-icons/fa";
import { useSelector } from "react-redux";
import { reduxStateInt, UserInt } from "../../usefull/interfaces";
import "./styles.css";
import Sidebar from "./Sidebar";

const Settings = () => {
  const [settings, setSettings] = useState<boolean>(true);

  const inputFile = useRef<any>(null);

  const user: UserInt | null = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

  const [form, setForm] = useState({
    avatar: user!.avatar,
    name: user!.name,
    email: user!.email,
    status: user!.status,
  });

  console.log(form);

  const changeImg = () => {
    inputFile.current.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files![0].name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
    setForm({
      ...form,
      [id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/users/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        let updatedUser = await response.json();
        console.log(updatedUser);
      } else {
        console.log("SOMETHING WENT WRONG!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {settings ? (
        <>
          <div className='top-bar-settings'>
            <HiArrowLeft
              className='arrow-icon-setting'
              onClick={() => setSettings(!settings)}
            />
            <span className='profile-setting-span'>Profile</span>
          </div>
          <div className='img-settings-cont'>
            <img
              src={user!.avatar}
              alt='profile'
              className='w-50 h-auto rounded-circle'
            />
            <div className='hover-img-cont' onClick={() => changeImg()}>
              <input
                type='file'
                id='file'
                ref={inputFile}
                style={{ display: "none" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFileUpload(e)
                }
              />
              <img
                src='https://placehold.it/100x100'
                alt='profile'
                className='h-100 w-auto rounded-circle'
              />
              <div className='hover-change-pic'>
                <FaCamera className='camera-icon' />
                <span className='change-pic-text'>
                  Change your profile picture
                </span>
              </div>
            </div>
          </div>
          <div className='other-fields-cont'>
            <div className='inputs-container'>
              <span className='inputs-label'>Your full name</span>
              <input
                type='text'
                id='name'
                value={form.name}
                //placeholder={user!.name}
                className='input-field'
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </div>

            <div className='inputs-container'>
              <span className='inputs-label'>Your email</span>
              <input
                type='text'
                id='email'
                value={form.email}
                //placeholder={user!.email}
                className='input-field'
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </div>

            <div className='inputs-container'>
              <span className='inputs-label'>Your status</span>
              <input
                type='text'
                id='status'
                value={form.status}
                //placeholder={user!.status}
                className='input-field'
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
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
