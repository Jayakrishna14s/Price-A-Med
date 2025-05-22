import BasicInfoForm from "./BasicInfoForm.jsx";
import React, {useState} from "react";

// eslint-disable-next-line react/prop-types
const BasicInfo = ({ data }) => {
  const [form, setForm] = useState(false);

  const handleEdit = () => {
    setForm(true);
  }


  const renderItem = (data) => (
    <div className="p-2">
      <div className="flex flex-col justify-between gap-2 mb-4">
        <div className="flex justify-between">
          <img
            src={data.image}
            className="h-[120px] w-[120px] rounded-full"
          />

          <img
            id={data.id}
            src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737815518/Evernorth/edit.svg"
            className="h-[20px] hover:scale-110 transition duration-500"
            onClick={handleEdit}
          />
        </div>

        <div>
          <div className="text-xl mt-2 font-semibold">{data.name}</div>
          <div className="text-xs">@{data.memberID}</div>
        </div>
      </div>
    </div>
  );

  return (
      <>
        <div className="border-[3px] bg-[#fff] shadow-lg text-[#035c67] rounded-md p-6 hover:scale-102">
          <div>{renderItem(data)}</div>
        </div>
        {form && (
            <div className="fixed top-0 left-0 right-0 bottom-0 z-50 h-screen w-full flex items-center justify-center">
              <div className="w-[35%]  bg-[#035c67aa]  p-4 rounded-lg border-2 border-[#035c67] shadow">
                <div className="flex flex-row-reverse">
                  <img
                      onClick={() => setForm(false)}
                      className="w-[25px]"
                      src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737997142/Evernorth/wrong.svg"
                  />
                </div>

                <BasicInfoForm initialDataSection={data} />
              </div>
            </div>
        )}

        {form && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 backdrop-blur-sm z-40"></div>
        )}
      </>
  );
};

export default BasicInfo;


// setIsFloatingFormOpen(true);
// setFloatingFormType(section.id);
// setDataSection(basicInfo);