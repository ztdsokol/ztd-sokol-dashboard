import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="animate-spin rounded-full border-t-4 border-solid h-12 w-12"></div>
    </div>
  );
};

export default Loader;
