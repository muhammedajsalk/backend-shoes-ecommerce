import { memo } from "react";


function NotFound(props) {
    return (
        <div className="flex flex-col items-center justify-center  text-center bg-gray-100 h-[630px]">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <h2 className="text-2xl text-gray-700 mt-2">Page Not Found</h2>
            <p className="text-gray-500 mt-4">{props.name}</p>
        </div>
    );
}

export default memo(NotFound);
