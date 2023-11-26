import { FcCheckmark } from 'react-icons/fc';
import Link from 'next/link';

const Successfull = () => {
  return (
    <div className="min-h-[70vh] h-full flex justify-center items-center">
      <div className="min-w-lg rounded-md px-5 pt-2 pb-5 bg-gray-200 text-center">
        <div className="flex justify-center">
          <FcCheckmark className="text-6xl" />
        </div>
        <h2 className="text-xl font-semibold">Your post placed successfully</h2>
        <Link href="/dashboard">
          <button className="bg-green-200 px-4 py-1.5 rounded-md mt-3 font-semibold">
            Back to dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Successfull;
