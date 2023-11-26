import { signIn, useSession } from "next-auth/react";
// import { useEffect } from "react";
// import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const Login = () => {
  // const router = useRouter();
  // const { status } = useSession();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push("/dashboard");
  //   }
  //   // eslint-disable-next-line
  // }, [status]);

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div>
        <button
          onClick={() => signIn("google")}
          className="flex items-center bg-slate-200 px-4 py-1.5 rounded-md"
        >
          <FcGoogle className="text-3xl mr-2" />
          <span className="font-semibold text-xl">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
