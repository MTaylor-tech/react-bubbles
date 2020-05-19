import React, {useEffect} from 'react';

export default function Logout({history, func}) {

  useEffect(()=>{
    localStorage.removeItem("token");
    func();
    history.push("/");
  },[history, func])

  return (
    <div></div>
  );
};
