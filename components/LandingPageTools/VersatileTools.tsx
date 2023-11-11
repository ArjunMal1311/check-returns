"use client";

const investmentOptions = [
    "Savings Account",
    "Retirement Fund",
    "Stock Portfolio",
    "Estate Investment",
    "Mutual Funds",
    "Cryptocurrency",
    "Gold Investments",
];

const ProgressBar: React.FC = () => {
    return (
        <div className="flex items-center justify-center select-none overflow-hidden w-full h-full contain">
            <ul>
                {investmentOptions.map((option, index) => (
                    <li
                        key={index}
                        className="bg-gray-300 text-white rounded-2xl flex items-center justify-center text-xl font-semibold"
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProgressBar;
