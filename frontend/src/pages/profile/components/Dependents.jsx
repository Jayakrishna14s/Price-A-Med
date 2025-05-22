import DeleteDependentForm from "./DeleteDependentForm.jsx";
import {useState} from "react";
import UpdateDependentForm from "./UpdateDependentForm.jsx";
import AddDependentForm from "./AddDependentForm.jsx";

const Dependents = ({
  dependents,
}) => {

  const [activeForm, setActiveForm] = useState("");
  const [dependentId, setDependentId] = useState("");
  const [dependentData, setDependentData] = useState({});


  const renderItem = (dependent, index) => {
    return (
      <>
        <div key={index} className="flex justify-between hover:bg-gray-100 p-2 rounded gap-20">

          <div className="flex flex-col flex-1">
            <h1 className="font-semibold">{dependent.name}</h1>
            <span className="text-xs ">@{dependent.dependentID}</span>

            <div className="flex gap-8 justify-between w-full">
              <div>
                <p className="font-medium mt-4">HealthConditions</p>
                <ul className="mx-0">
                  {dependent.healthConditions.map((condition, idx) => (
                      <li key={idx}>
                        <div className="text-sm">{condition.name}</div>
                      </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-medium mt-4">Allergies</p>
                <ul className="mx-0">
                  {dependent.allergies.map((allergy, idx) => (
                      <li key={idx}>
                        <div className="text-sm" key={idx}>{allergy.name}</div>
                        {/*<div className="text-sm">{dependent.description1}</div>*/}
                      </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-medium mt-4">Medications</p>
                <ul className="mx-0">
                  {dependent.medications.map((medication, idx) => (
                      <li key={idx}>
                        <div className="text-sm">{medication.name}</div>
                        {/*<div className="text-sm">{dependent.description1}</div>*/}
                      </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          <div className="flex flex-col gap-4 ">
            <div className="flex gap-4 flex-row-reverse">
              <img
                  onClick={() => {
                    setActiveForm("edit");
                    setDependentData(dependent);
                  }}
                  src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737904244/Evernorth/dependent-edit.svg"
                  className="w-[20px]"
              />
              <img
                onClick={() => {
                  setActiveForm("delete");
                  setDependentId(dependent.dependentID);
                }}
                src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737904496/Evernorth/delete.svg"
                className="w-[20px]"
              />
            </div>
            <img
              src={dependent.image}
              className="w-[100px] h-[100px] rounded"
            />
          </div>
        </div>
      </>
    );
  };

  return (
      <>
        <div className="bg-white rounded shadow-md border-[3px]">
          <div className=" text-left mt-8 text-[#035c67] font-semibold text-3xl bg-[#fff] shadow-lg p-2 pl-8 rounded">
            Dependents
          </div>
            {/* eslint-disable-next-line react/prop-types */}
          {dependents.map((dependent, index) => {
            return (
              <div
                key={index}
                className="bg-[#fff] shadow-lg text-[#035c67] rounded-md p-6 hover:scale-102"
              >
                {renderItem(dependent, index)}
              </div>
            );
          })}

          <div className="border-[0px] bg-[#fff] shadow-lg text-[#035c67] rounded-md p-6 hover:scale-102 flex flex-col justify-center items-center">
            <img
              onClick={() => setActiveForm("add")}
              src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737899776/add.svg"
              className="h-[60px] hover:scale-110 transition duration-500"
            />
            <h1>Add a dependent</h1>
          </div>
        </div>

        {activeForm === "delete" && (
            <div className="fixed top-0 left-0 right-0 bottom-0 z-50 h-screen w-full flex items-center justify-center">
              <div className="w-[35%]  bg-[#035c67aa]  p-4 rounded-lg border-2 border-[#035c67] shadow">
                <div className="flex flex-row-reverse">
                  <img
                      onClick={() => {setActiveForm("")} }
                      className="w-[25px]"
                      src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737997142/Evernorth/wrong.svg"
                  />
                </div>

                <DeleteDependentForm  dependentID={dependentId}/>
              </div>
            </div>
        )}

        {activeForm === "edit" && (
            <div className="fixed top-0 left-0 right-0 bottom-0 z-50 h-screen w-full flex items-center justify-center">
              <div className="w-[35%]  bg-[#035c67aa]  p-4 rounded-lg border-2 border-[#035c67] shadow">
                <div className="flex flex-row-reverse">
                  <img
                      onClick={() => {setActiveForm("")} }
                      className="w-[25px]"
                      src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737997142/Evernorth/wrong.svg"
                  />
                </div>

                <UpdateDependentForm initialDataSection={dependentData}/>
              </div>
            </div>
        )}

        {activeForm === "add" && (
            <div className="fixed top-0 left-0 right-0 bottom-0 z-50 h-screen w-full flex items-center justify-center">
              <div className="w-[35%]  bg-[#035c67aa]  p-4 rounded-lg border-2 border-[#035c67] shadow">
                <div className="flex flex-row-reverse">
                  <img
                      onClick={() => {setActiveForm("")} }
                      className="w-[25px]"
                      src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737997142/Evernorth/wrong.svg"
                  />
                </div>

                <AddDependentForm/>
              </div>
            </div>
        )}

        {activeForm && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 backdrop-blur-sm z-40"></div>
        )}
      </>
  );
};

export default Dependents;
