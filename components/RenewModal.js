function RenewModal({
  showRenewModal,
  setShowRenewModal,
  handlePostRenew,
  isRenewing,
}) {
  return (
    <div className="fixed inset-0 w-full h-full bg-slate-500 backdrop flex justify-center items-center">
      <div className=" bg-white rounded-lg w-full lg:w-[400px] mx-4 lg:mx-0 p-3 lg:p-8">
        <h4 className="text-center text-xl font-bold">{`Do you want to renew "${showRenewModal.title}"?`}</h4>
        <div className="mt-10 flex justify-between items-center ">
          <button
            type="button"
            className="px-3 py-2 font-semibold bg-gray-500 text-white rounded-md min-w-[150px] disabled:pointer-events-none disabled:opacity-50"
            onClick={() => setShowRenewModal(null)}
            disabled={isRenewing}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-3 py-2 font-semibold bg-blue-500 text-white rounded-md min-w-[150px] disabled:pointer-events-none disabled:opacity-50"
            onClick={() => handlePostRenew(showRenewModal._id)}
            disabled={isRenewing}
          >
            Renew
          </button>
        </div>
      </div>
    </div>
  );
}

export default RenewModal;
