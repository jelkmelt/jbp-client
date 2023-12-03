import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const callback_url = router.query?.callback_url || "/dashboard";

  // console.log("callbackUrl", callback_url);

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div>
        <button
          // onClick={() => signIn("google")}
          onClick={() => {
            const res = signIn("google", {
              // callbackUrl: callback_url,
              callbackUrl: `${window.location.origin}${callback_url}`,
              // callbackUrl: router.query.callbackurl
              //   ? `${window.location.origin}${router.query.callbackurl}`
              //   : `${window.location.origin}`,
              // redirect: true,
              // redirect: false,
            });
          }}
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

// export async function getServerSideProps({ req, res }) {
//   const session = await getServerSession(req, res, authOptions);

//   if (session) {
//     return {
//       redirect: {
//         destination: "/dashboard",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }
