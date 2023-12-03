import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

function useAdminSignin() {
  const router = useRouter();
  const callback_url = router.query?.callback_url || "/admin";

  const adminSignin = async (values) => {
    // const toastSignin = toast.loading("Loading...");

    try {
      const response = await signIn("credentials", {
        ...values,
        callbackUrl: `${window.location.origin}${callback_url}`,
        // redirect: false,
      });

      if (response?.ok) {
        console.log(response);
        // toast.success("Signin Successful", {
        //   id: toastSignin,
        // });
        // router.push("/admin");
      } else if (response?.error) {
        console.log("error response", response);
        toast.error(
          `${response?.error}`
          // {
          //   id: toastSignin,
          // }
        );
      }
    } catch (error) {
      console.log("error auth", error);
      toast.error(
        "Something went wrong"
        // {
        //   id: toastSignin,
        // }
      );
    }
  };

  return { adminSignin };
}

export default useAdminSignin;
