import React from "react";

const EmptyCard = ({ imgSrc, message, reference }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[550px]">
        <img src={imgSrc} alt="No notes" className="w-40 opacity-30" />

        <p className="w-1/2 text-sm font-medium text-gray-400 text-center leading-7 mt-5 mb-20">
          {message}
        </p>
      </div>

      {/* <div className='flex justify-center bg-red-500'>
    <p className='w-1/2 text-sm text-gray-300 text-center leading-7'>{reference}</p>
    </div> */}
    </>
  );
};

export default EmptyCard;
