import React, {useState} from "react";
import ContactInfoForm from "./ContactInfoForm.jsx";

const ContactInfo = ({data}) => {

    const [form, setForm] = useState(false);

    const handleEdit = () => {
        setForm(true);
    }

    const renderItem = (data) => (
        <div className="p-2">
            <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold">{data.title}</span>
                {data.id !== "subscription" &&
                    data.id != "currentMedications" && (
                        <img
                            id={data.id}
                            src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737815518/Evernorth/edit.svg"
                            className="h-[20px] hover:scale-110 "
                            onClick={handleEdit}

                        />
                    )}
            </div>

            <div className="flex gap-4">
                <img src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737818607/Evernorth/phone.svg" />
                <span>{data.phone}</span>
            </div>
            <div className="flex gap-4">
                <img src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737818459/Evernorth/email.svg" />
                <span>{data.email}</span>
            </div>
            <div className="flex gap-4">
                <img src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737818673/Evernorth/location.svg"/>
                <span>{data.location}</span>
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

                        <ContactInfoForm initialDataSection={data} />
                    </div>
                </div>
            )}

            {form && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 backdrop-blur-sm z-40"></div>
            )}
        </>
    );
}

export default ContactInfo;

// onClick={() => {
//     setIsFloatingFormOpen(true);
//     setFloatingFormType(section.id);
//     setDataSection(
//         section.id == "contactInfo"
//             ? contactInfo
//             : section.id == "healthConditions"
//                 ? healthConditions
//                 : paymentInfo
//     );
// }}