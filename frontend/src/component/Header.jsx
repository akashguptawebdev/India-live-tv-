import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { View } from 'lucide-react';
import { useAppContext } from "../context/AppContext";
const Header = () => {
      const {
    activeChannel,
    setActiveChannel,
    setActiveStream,
  } = useAppContext();
  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Logo */}
        <div className="logo" onClick={()=> setActiveChannel(null)}> <View /> Indian Live TV+</div>

        {/* Desktop Nav */}
        <nav className="nav-links">
          <p >Home</p>
          <p onClick={()=> setActiveChannel(null)}>Channels</p>
          <p >Categories</p>
          <p >About</p>
        </nav>
      </div>
    </header>
  );
};

export default Header;
