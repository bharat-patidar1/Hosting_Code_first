// src/pages/ApplyLeavePage.jsx
import React from "react";

import bgImage from '../images/applyleave.jpg'
import ApplyLeave from "./ApplyLeave";

const ApplyLeavePage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <ApplyLeave />
    </div>
  );
};

export default ApplyLeavePage;
