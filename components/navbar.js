import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  console.log("session", session);

  const isUser = session?.user.role === "user";

  return (
    <nav>
      <div className="container  text-center sm:flex justify-between py-2 sm:py-4 border-b border-gray-300">
        <Link href="/" className="text-4xl font-bold inline-block mb-3 sm:mb-0">
          Justbackpage
        </Link>
        <div>
          {/* {status !== "authenticated" ? ( */}
          {status !== "loading" &&
            (!isUser ? (
              <Link
                href="/login"
                className="bg-green-300 px-5 py-2 inline-block rounded-sm font-semibold"
              >
                Login/Signup
              </Link>
            ) : (
              <div>
                <Link
                  href="/dashboard"
                  className="bg-green-300 px-5 py-2 inline-block rounded-sm font-semibold mr-2"
                >
                  Dashboard
                </Link>
                <button
                  className="bg-green-300 px-5 py-2 rounded-sm font-semibold"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            ))}
          {/* {} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
