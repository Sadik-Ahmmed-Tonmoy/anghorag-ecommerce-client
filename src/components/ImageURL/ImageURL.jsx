/* eslint-disable no-undef */
import { twMerge } from "tailwind-merge";

const ImageURL = ({ style, image, className }) => {
  return (
    <>
      {image && (
        <img
          className={twMerge("", className)}
          src={`https://application.anghorag.com/${image}`}
          alt=""
          style={style}
        />
      )}
    </>
  );
};

export default ImageURL;
