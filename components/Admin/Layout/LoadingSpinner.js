import { RotatingLines } from "react-loader-spinner";

export const LoadingSpinner = () => {
  return (
    // <div className="absolute flex justify-center items-center h-[80vh] inset-0">
    <div className="absolute flex justify-center items-center h-[calc(100vh-170px)] inset-0">
      <div className="">
        <RotatingLines
          height="50"
          width="50"
          strokeColor="grey"
          strokeWidth="3"
          animationDuration="0.4"
          visible={true}
        />
      </div>
    </div>
  );
};
