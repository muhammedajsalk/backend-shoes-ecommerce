import { memo } from "react";
import { useNavigate } from "react-router-dom";

 function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-10 px-6">
        <div className="mt-10 text-center text-sm text-gray-400">
          &copy;2025 Shoes Hub. All rights reserved.
        </div>
      </footer>
    );
  }

  export default memo(Footer)