import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export const PasswordField = ({ label, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="">
      <label className="font-medium text-gray-600">
        {label}
        <div className="relative mt-1">
          <Field
            className="p-2.5 w-full outline-none bg-gray-50 rounded-md border border-gray-300 focus:border-blue-400"
            // id={name}
            // name={name}
            {...props}
            type={showPassword ? "text" : "password"}
            autoComplete="on"
            required
          />
          <p className="absolute text-xs text-red-600 -bottom-4">
            <ErrorMessage {...props} />
          </p>
          <div className="absolute inset-y-0 flex items-center right-3">
            <span
              className="p-[6px] text-lg cursor-pointer hover:bg-gray-200 active:bg-gray-300 rounded-full text-black/60"
              onClick={() => setShowPassword(!showPassword)}
            >
              <span>
                {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
              </span>
            </span>
          </div>
        </div>
      </label>
    </div>
  );
};
