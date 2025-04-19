import React from "react";
import NavigationBar from "../Components/NavigationBar";

const ProfilePage = () => {
  return (
    <div className="flex flex-col items-center justify-start">
      <NavigationBar />
      
      <main>
        <input type="text" name="name" id="" value={'Shubham'}/>
      </main>
    </div>
  );
};

export default ProfilePage;
