const Suggestion = ({percentage}) => {
    return (
        <div
            className="border-[3px] flex justify-between border-[#035c67] bg-[#3EFFC055] shadow-lg text-[#035c67] rounded-md p-6 hover:scale-102">
            <div className="flex flex-col gap-2">
                <span className="text-xs  font-semibold">
                  Complete your profile
                </span>
                <h1 className="text-xl  font-bold">Add your missing details</h1>
            </div>
            <div className="h-[100%] aspect-[1/1]">
                <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#035c67"
                        strokeWidth="4"
                        strokeDasharray={`${percentage}, 100`}
                    />
                    <text
                        x="18"
                        y="18"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="9"
                        fill="#035c67"
                        fontWeight="bold"
                    >
                        {percentage}%
                    </text>
                </svg>
            </div>
        </div>
    )
}

export default Suggestion;