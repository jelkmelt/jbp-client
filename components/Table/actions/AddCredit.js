import { useState } from "react";
import { Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import usePostData from "@/hooks/usePostData";
import { InputField } from "@/components/Admin/FormFields/InputField";

function AddCredit({ userInfo }) {
  const [showCreditModal, setShowCreditModal] = useState(false);

  const initialvalues = {
    credit: "",
  };

  const { mutate, isLoading } = usePostData({
    path: `/admin/payment/${userInfo._id}`,
    revalidate: "/get/data",
  });

  const handleAddCredit = (values) => {
    // const toastAddCredit = toast.loading("Loading...");

    mutate(values, {
      onSuccess: () => {
        toast.success(
          `Added ${values.credit} credit to ${userInfo.name}`
          //  {
          //   id: toastAddCredit,
          // }
        );
      },
      onError: (error) => {
        toast.error(
          error.response.data.message
          //    {
          //   id: toastAddCredit,
          // }
        );
      },
      onSettled: () => {
        setShowCreditModal(false);
      },
    });
  };

  return (
    <div className="">
      <button
        className="bg-blue-600 text-xs text-white font-semibold px-2 py-1 rounded"
        onClick={() => setShowCreditModal(true)}
      >
        Add Credit
      </button>

      {showCreditModal && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-sm h-screen w-full overflow-y-hidden">
          <div className="h-screen flex justify-center items-center">
            <div className="mx-2 bg-white p-3 lg:p-8 rounded-lg">
              <div className="pb-4 border-b">
                <p className="text-center text-xl lg:text-2xl text-gray-600 font-bold">
                  {`Add credit to "${userInfo.name}"`}
                </p>
              </div>

              <Formik
                initialValues={initialvalues}
                // validationSchema={validate}
                onSubmit={handleAddCredit}
              >
                {({ isSubmitting }) => (
                  <Form className="mt-5">
                    <div className="gap-y-5 md:gap-y-7">
                      <div className="min-w-[280px] lg:min-w-[350px] space-y-4">
                        <InputField
                          label="Credit *"
                          name="credit"
                          type="number"
                        />
                      </div>

                      <div className="mt-5 lg:mt-8 flex justify-center gap-7 items-center">
                        <button
                          type="button"
                          className="w-full bg-cyan-600  text-white font-semibold px-4 py-3 rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                          onClick={() => setShowCreditModal(false)}
                          disabled={isSubmitting}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="w-full bg-blue-600  text-white font-semibold px-4 py-3 rounded-lg  disabled:opacity-50 disabled:pointer-events-none"
                          onClick={handleAddCredit}
                          disabled={isSubmitting}
                        >
                          Add Credit
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCredit;
