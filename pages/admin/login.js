import { Formik, Form } from "formik";
// import HeadSection from "@/components/Layout/HeadSection";
import { InputField } from "@/components/Admin/FormFields/InputField";
import { PasswordField } from "@/components/Admin/FormFields/PasswordField";
import useAdminSignin from "@/hooks/useAdminSignin";

const pageDetails = {
  title: "Admin signin page",
  description: "",
  keywords: "",
};

function AdminLoginPage() {
  const initialvalues = {
    email: "",
    password: "",
  };

  const { adminSignin } = useAdminSignin();

  const handleSubmit = async (values) => {
    await adminSignin(values);
    // console.log(values);
  };

  return (
    <>
      {/* <HeadSection pageDetails={pageDetails} /> */}
      <div className="flex justify-center items-center h-screen bg-gray-200">
        {/* {loading && <FullPageLoader />} */}

        <div className="bg-gray-50 px-5 lg:px-10 py-14 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-center text-custom-blue">
            Sign in as Admin
          </h1>
          <div className="mt-8">
            <Formik
              initialValues={initialvalues}
              // validationSchema={validate}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="gap-y-5 md:gap-y-7">
                    <div className="min-w-[300px] lg:min-w-[350px] space-y-4">
                      <InputField label="Email *" name="email" type="email" />

                      <PasswordField label="Password *" name="password" />
                    </div>

                    <button
                      type="submit"
                      className="relative mt-10 w-full py-3 bg-cyan-800 rounded-lg text-white font-bold hover:opacity-90 transition duration-200 disabled:opacity-50 disabled:pointer-events-none"
                      disabled={isSubmitting}
                    >
                      <span>Sign In</span>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLoginPage;
