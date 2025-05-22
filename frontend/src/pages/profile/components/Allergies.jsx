import AllergiesForm from "./AllergiesForm.jsx";
import { useState } from "react";

const Allergies = ({ data }) => {
    const [form, setForm] = useState(false);

    const handleEdit = () => {
        setForm(!form);
    };

    const renderItem = (item) => (
        <div className="p-2">
            <div className="flex flex-col justify-between gap-4 mb-4">
                <div className="flex justify-between items-center ">
                    <span className="text-xl font-semibold">{item.title}</span>
                    <img
                        className="w-6 hover:scale-105"
                        src="https://res.cloudinary.com/dkezdazmt/image/upload/v1742160799/Evernorth/Plus.svg"
                        onClick={handleEdit}
                        alt="Edit"
                    />
                </div>
                <div className="flex gap-1 flex-col">
                    {item.allergies.length === 0 ? (
                        <div className="flex justify-center h-[60px]">
                            <img src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737902486/Evernorth/history.svg" alt="No allergies" />
                        </div>
                    ) : (
                        item.allergies.map((allergyObj, index) => (
                            <div key={index} className="flex justify-between items-center hover:bg-gray-100">
                                <span>{allergyObj.name}</span>
                                {/*<img className="w-4 mr-1 hover:scale-105 " src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737904496/Evernorth/delete.svg" alt="Delete"/>*/}
                            </div>
                        ))
                    )}
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
                                onClick={handleEdit}
                                className="w-[25px]"
                                src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737997142/Evernorth/wrong.svg"
                                alt="Close"
                            />
                        </div>

                        <AllergiesForm initialSelectedAllergies={data.allergies} />
                    </div>
                </div>
            )}

            {form && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 backdrop-blur-sm z-40"></div>
            )}
        </>
    );
};

export default Allergies;