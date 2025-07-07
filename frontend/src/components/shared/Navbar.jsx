import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import code1st from '../images/code1st.png'

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">
      <img className="h-10 w-25" src={code1st} alt="CN"/>
      <div className="text-2xl font-bold text-primary ml-4">Code1st HealthCare</div>

      {/* Center Buttons */}
      <div className="hidden md:flex gap-6 ml-auto mr-12">
        {/* <Button variant="ghost">Home</Button>
        <Button variant="ghost">About</Button>
        <Button variant="ghost">Contact</Button> */}
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-2">
        <Button variant="outline"><Link to="/login">Login Page</Link></Button>
      </div>
    </nav>
  );
}
