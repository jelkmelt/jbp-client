import { ErrorMessage, Field } from "formik";

export const InputField = ({ label, ...props }) => {
  return (
    <div className="">
      <label className="font-medium">
        {label}
        <div className="relative mt-1">
          <Field
            className="p-2 w-full outline-none bg-gray-50 rounded-md border border-gray-300 focus:border-blue-400"
            // id={name}
            // name={name}
            {...props}
            required
          />
          <p className="absolute text-xs text-red-600 -bottom-4">
            <ErrorMessage {...props} />
          </p>
        </div>
      </label>
    </div>
  );
};
