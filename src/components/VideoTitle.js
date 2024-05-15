const VideoTitle = ({ title }) => {
    return (
      <div className="w-screen aspect-video pt-[20%] px-6 md:px-16 absolute text-white bg-gradient-to-r from-black">
        <h1 className="text-xl md:text-5xl mx-0 px-0 font-bold my-9">{title}</h1>
       {/* // <p className="py-6 text-sm w-1/4">{overview}</p> */}
        <div className="my-4 md:m-0">
          <button className=" bg-white m-0 text-black p-1 text md:py-2 px-7 text-xl rounded-md hover:bg-opacity-80">
            ▶️ Play
          </button>
          <button className="hidden md:inline-block mx-2  bg-gray-500 text-white py-2 my-4 px-12 text-xl bg-opacity-50 rounded-md">
            More Info
          </button>
        </div>
      </div>
    );
  };
  export default VideoTitle;