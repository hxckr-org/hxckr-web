const DeleteAccount = () => (
    <div className="bg-white rounded-lg border border-[#DBE2E8]">
      <div className="p-6 bg-[#F5F5F5] rounded-t-lg">
        <h2 className="text-xl font-semibold text-[#313233]">Delete Account</h2>
      </div>
      <div className="p-6">
        <p className="text-[#5A5A5A] mb-6 font-normal">
          Deleting your account is permanent. All your data, including personal info, and history,
          will be erased and can't be recovered.
        </p>
        <button className="text-red-600 border border-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors font-normal">
          Delete account
        </button>
      </div>
    </div>
  );

export default DeleteAccount;