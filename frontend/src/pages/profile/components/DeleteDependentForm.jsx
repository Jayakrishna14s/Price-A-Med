import React from "react";

const DeleteDependentForm = ({dependentID}) => {
  return (
      <>
        <h1 className="text-white my-4 font-semibold text-2xl p-4">
          Are you sure, you want to delete dependent?
        </h1>
        <div className="flex pl-4 w-full mb-4">
          <button
            onClick={() => console.log(dependentID)}
            className="bg-red-500 p-2 px-4 text-white font-semibold rounded-lg hover:bg-red-200 hover:scale-110 transition duration-1000"
          >
            Delete
          </button>
        </div>
      </>
  );
};

export default DeleteDependentForm;
