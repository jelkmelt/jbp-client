import useToggle from "@/hooks/useToggle";
import { signOut } from "next-auth/react";
import { FaAngleDown, FaBars, FaAngleUp } from "react-icons/fa";

function AdminHeader({ showSidebar, setShowSidebar }) {
  const { toggle, setToggle, node } = useToggle();

  const handleSignout = () => {
    signOut({
      callbackUrl: `${window.location.origin}/admin/login`,
      // redirect: false,
    });
  };

  return (
    <div className="sticky top-0 z-20">
      <div className="relative z-20">
        <div className="bg-white h-[68px] w-full flex justify-between lg:justify-end items-center shadow-md  px-7 z-30">
          <div
            className="text-cyan-700 lg:hidden"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <FaBars />
          </div>

          <div className="text-xl mx-auto  font-bold lg:hidden">
            Justbackpage Admin
          </div>

          <div className="flex justify-between items-center gap-5 lg:gap-[80px]">
            <div className="hidden lg:flex justify-between items-center gap-12 text-gray-500 text-base font-semibold">
              <p className="">Signed in as Admin</p>
            </div>

            <button
              className="hidden lg:block bg-cyan-500 hover:bg-opacity-80 active:scale-95 text-sm text-white font-semibold px-2 py-1 lg:px-4 lg:py-2 rounded-lg transition duration-200"
              onClick={handleSignout}
            >
              Sign out
            </button>
          </div>

          <button
            className="lg:hidden text-cyan-500 p-1 rounded-full border-2 border-cyan-500"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        </div>
      </div>
      <div
        ref={node}
        className={`lg:hidden flex flex-col items-center bg-[#212E34] absolute top-[68px] w-full py-7 text-sm text-white font-semibold shadow-md ease-out duration-300 z-10
            ${toggle ? "translate-y-0" : "-translate-y-full shadow-none"}`}
      >
        <p className="py-3">Signed in as Admin</p>
        <button
          type="button"
          className="mt-2 px-5 py-2 bg-cyan-500 hover:bg-opacity-80 text-sm rounded-lg active:scale-95 transition duration-200"
          onClick={handleSignout}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default AdminHeader;
