"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JetBrains_Mono } from 'next/font/google';

const allLabels = [
    { index: 1, label: "Effortless calculations at your fingertips, making financial planning a breeze." },
    { index: 2, label: "Explore our accessible tools that provide easy and convenient access to financial insights and calculations." },
    { index: 3, label: "Experience simplified financial calculations with our user-friendly calculator tools." },
    { index: 4, label: "Calculate financial figures at lightning speed, making calculations easy." },
];

const JetBrains = JetBrains_Mono({ subsets: ['latin'] });

const ScreenFriendly = () => {
    const [selectedTab, setSelectedTab] = useState(allLabels[0]);

    return (
        <div className={`window ${JetBrains.className} flex flex-col h-full rounded-2xl px-4`}>
            <nav className="flex justify-end items-center bg-[#fdfdfd] px-5 py-4 rounded-tl-[10px] rounded-tr-[10px] border-b border-solid border-[#eee] h-[44px]">
                <div className="flex space-x-2 justify-end items-center pr-4">
                    <div className="w-[12px] h-[12px] rounded-full cursor-pointer bg-red-800"></div>
                    <div className="w-[12px] h-[12px] rounded-full cursor-pointer bg-yellow-500"></div>
                    <div className="w-[12px] h-[12px] rounded-full cursor-pointer bg-green-700"></div>
                </div>
            </nav>
            <main className="flex flex-col select-none h-full  p-2 mb-2">
                <div className="flex justify-around w-full py-4">
                    <div className={`ml-2 font-bold text-[14px] border-2 rounded-lg px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedTab.index === 1 && "bg-gray-200"}`} onClick={() => setSelectedTab(allLabels[0])}>Effortless</div>
                    <div className={`ml-2 font-bold text-[14px] border-2 rounded-lg px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedTab.index === 2 && "bg-gray-200"}`} onClick={() => setSelectedTab(allLabels[1])}>Accessible</div>
                    <div className={`ml-2 font-bold text-[14px] border-2 rounded-lg px-3 py-1 cursor-pointer hover:bg-gray-200 ${selectedTab.index === 3 && "bg-gray-200"}`} onClick={() => setSelectedTab(allLabels[2])}>Simplified</div>
                    <div className={`ml-2 font-bold text-[14px] border-2 rounded-lg px-3 py-1 cursor-pointer hover:bg-gray-200 sm:flex hidden ${selectedTab.index === 4 && "bg-gray-200"}`} onClick={() => setSelectedTab(allLabels[3])}>Streamlined</div>
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab ? selectedTab.index : "empty"}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex justify-center items-center h-full"
                    >
                        <div className="px-4 text-[30px]">
                            {selectedTab ? selectedTab.label : "😋"}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

export default ScreenFriendly;
