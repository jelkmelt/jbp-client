import { LoadingSpinner } from "./LoadingSpinner";

function PageWrapper({ icon, title, isLoading, children }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        {/* <span className="h-7 w-7 text-custom-blue2">{icon}</span> */}
        <h1 className="text-2xl font-bold text-gray-700">{title}</h1>
      </div>

      {isLoading && <LoadingSpinner />}

      <div className="mt-5">{children}</div>
    </div>
  );
}

export default PageWrapper;
