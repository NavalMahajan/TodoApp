import React from "react";
import { Toaster } from "react-hot-toast";
const Toastr = () => {
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            theme: {
              primary: "#4aed88",
            },
          },
        }}
      ></Toaster>
    </div>
  );
};

export default Toastr;
