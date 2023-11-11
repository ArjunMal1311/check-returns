"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Inter } from 'next/font/google';
import { GrSettingsOption } from 'react-icons/gr';
import { JetBrains_Mono } from 'next/font/google';
import axios from 'axios';
import toast from 'react-hot-toast';
import FDChart from '@/components/Charts/ChartFD/FDPieChart';
import TextInput from '@/components/TextInput';
import FDScatter from '@/components/Charts/ChartFD/FDScatter';
import FDLine from '@/components/Charts/ChartFD/FDLine';
import FDBubble from '@/components/Charts/ChartFD/FDBubble';

const InterScript = Inter({ subsets: ['latin'] });
const JetBrains = JetBrains_Mono({ subsets: ['latin'] });

const FixedDepositCalculator = () => {
    const [investment, setInvestment] = useState<string>('10000');
    const [rateOfInterest, setRateOfInterest] = useState<string>('5.7');
    const [timePeriod, setTimePeriod] = useState<string>('4');
    const [clearedInvestment, setClearedInvestment] = useState<boolean>(false);
    const [clearedRateOfInterest, setClearedRateOfInterest] = useState<boolean>(false);
    const [clearedTimePeriod, setClearedTimePeriod] = useState<boolean>(false);
    const [active, setActive] = useState<string>("Scatter")
    const [showSettings, setShowSettings] = useState(false);
    const [timeUnit, setTimeUnit] = useState('years');
    const settingsPanelRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsPanelRef.current && !(settingsPanelRef.current as Node).contains(event.target as Node)) {
                setShowSettings(false);
            }
        };

        if (showSettings) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showSettings]);

    const toggleSettingsPanel = () => {
        setShowSettings(!showSettings);
    };

    const handleTimeUnitChange = (selectedTimeUnit: string) => {
        setTimeUnit(selectedTimeUnit);
    };



    const calculateReturns = () => {
        const principal = parseFloat(investment);
        const interestRate = parseFloat(rateOfInterest) / 100;
        let years = parseFloat(timePeriod);

        if (timeUnit === 'months') {
            years = years / 12;
        } else if (timeUnit === 'days') {
            years = years / 365;
        }

        const returns = principal + principal * interestRate * years;
        const totalValue = principal + returns;

        const SaveData = async () => {
            await axios.post("/api/transaction", { investmentType: "fixed-deposit", investment, rateOfInterest, timePeriod, timeUnit, returns, totalValue })
        }

        const SaveTransactionData = async () => {
            await toast.promise(
                SaveData(),
                {
                    loading: "Saving",
                    success: "Success",
                    error: "Try again"
                }
            )
        }

        return (
            <div className='md:h-[380px] h-fit border-[10px] lg:ml-8 mt-8 lg:mt-0 rounded-lg p-4 w-full flex justify-between items-center flex-col md:flex-row'>
                <div className='flex flex-col justify-between h-full md:w-1/2 w-full p-4 md:mr-16'>
                    <div className='w-full'>
                        <h4 className={`font-bold text-3xl ${InterScript.className}`}>Summary</h4>
                        <div className='flex flex-col mt-4 text-[17px] font-normal'>
                            <div className='flex space-x-4 justify-between'>
                                <div>Investment Amount</div>
                                <div>₹{investment}</div>
                            </div>
                            <div className='flex space-x-4 justify-between '>
                                <div>Rate of Interest</div>
                                <div>{rateOfInterest}%</div>
                            </div>
                            <div className='flex space-x-4 justify-between '>
                                <div>Time Period</div>
                                <div>{timePeriod} {timeUnit}(s)</div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 mb-4 text-[17px] font-semibold w-full'>
                        <div className='flex space-x-4 justify-between '>
                            <div>Returns</div>
                            <div>₹{returns.toFixed(2)}</div>
                        </div>
                        <div className='flex space-x-4 justify-between '>
                            <div>Total Value</div>
                            <div>₹{totalValue.toFixed(2)}</div>
                        </div>

                        <div className={`font-normal ${JetBrains.className} hover:bg-blue-300 bg-blue-100 w-full rounded-lg mt-3 flex justify-center items-center select-none h-[35px]`} onClick={SaveTransactionData}>Save this result</div>
                    </div>
                </div>

                <div className='h-full w-[2px] border-2'></div>

                <div className='pr-4 flex items-center justify-center w-1/2'>
                    <FDChart investment={investment} rateOfInterest={rateOfInterest} timePeriod={timePeriod} />
                </div>
            </div>
        );
    };

    const handleInvestmentChange = (value: string) => {
        if (!isNaN(parseFloat(value)) && parseFloat(value) >= 0) {
            setInvestment(value);
            if (value !== '0') {
                setClearedInvestment(false);
            }
        } else if (value === '') {
            setInvestment('0');
            setClearedInvestment(true);
        }
    };

    const handleRateOfInterestChange = (value: string) => {
        if (!isNaN(parseFloat(value)) && parseFloat(value) >= 1) {
            setRateOfInterest(value);
            if (value !== '0') {
                setClearedRateOfInterest(false);
            }
        } else if (value === '') {
            setRateOfInterest('0');
            setClearedRateOfInterest(true);
        }
    };

    const handleTimePeriodChange = (value: string) => {
        if (!isNaN(parseInt(value)) && parseInt(value) >= 0) {
            setTimePeriod(value);
            if (value !== '0') {
                setClearedTimePeriod(false);
            }
        } else if (value === '') {
            setTimePeriod('0');
            setClearedTimePeriod(true);
        }
    };

    return (
        <div className={`lg:mx-16 mx-4 my-8 ${InterScript.className}`}>
            <h2 className='flex justify-between sm:flex-row sm:items-center flex-col'>
                <div className='bg-clip-text text-transparent bg-gradient-to-r from-[#5A32A3] to-[#D03592] relative sm:text-[40px] text-[30px] font-bold'>Fixed Deposit Calculator</div>
                <div className='bg-gray-200 px-3 py-1 rounded-xl h-fit font-normal mt-1 w-fit select-none cursor-pointer hover:bg-gray-400 transition duration-500'>All Calculators</div>
            </h2>

            <div className='font-normal relative bottom-2 italic select-none sm:flex hidden'>
                (Scroll to get more information about Fixed Deposit)
            </div>

            <div className='flex mt-6 lg:flex-row flex-col'>
                <div className='h-[380px] border-[10px] lg:w-[600px] rounded-2xl w-full'>
                    <div className='p-3 flex justify-between items-center'>
                        <div
                            className='bg-gray-200 rounded-lg px-3 py-1 text-[12px] text-black flex items-center space-x-1 select-none cursor-pointer hover-bg-gray-300'
                            onClick={toggleSettingsPanel}
                        >
                            <div>
                                <GrSettingsOption />
                            </div>
                            <div>Settings</div>
                        </div>

                        <div className=''>
                            {showSettings && (
                                <div ref={settingsPanelRef} className='absolute sm:left-[85px] left-[30px] transition duration-1000 bg-white z-50 mt-4 border-2 p-4 rounded-lg'>
                                    <div className='mb-4'>
                                        <label className='block text-[16px] font-semibold mb-2'>Time Period</label>
                                        <div className='flex space-x-4'>
                                            <label className='inline-flex items-center'>
                                                <input
                                                    type='radio'
                                                    value='years'
                                                    checked={timeUnit === 'years'}
                                                    onChange={() => handleTimeUnitChange('years')}
                                                />
                                                <span className='ml-2'>Years</span>
                                            </label>
                                            <label className='inline-flex items-center'>
                                                <input
                                                    type='radio'
                                                    value='months'
                                                    checked={timeUnit === 'months'}
                                                    onChange={() => handleTimeUnitChange('months')}
                                                />
                                                <span className='ml-2'>Months</span>
                                            </label>
                                            <label className='inline-flex items-center'>
                                                <input
                                                    type='radio'
                                                    value='days'
                                                    checked={timeUnit === 'days'}
                                                    onChange={() => handleTimeUnitChange('days')}
                                                />
                                                <span className='ml-2'>Days</span>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            )}

                        </div>

                        <div className='flex space-x-2'>
                            <div className='w-[12px] h-[12px] bg-red-400 rounded-full hover:bg-red-600 cursor-pointer'></div>
                            <div className='w-[12px] h-[12px] bg-yellow-300 rounded-full hover:bg-yellow-600 cursor-pointer'></div>
                            <div className='w-[12px] h-[12px] bg-green-500 rounded-full hover:bg-green-600 cursor-pointer'></div>
                        </div>
                    </div>

                    <div className='px-4 py-2 mb-4'>
                        <TextInput
                            id='investment'
                            label='Investment Amount (in ₹)'
                            value={clearedInvestment ? '' : investment}
                            onChange={handleInvestmentChange}
                        />

                        <TextInput
                            id='rateOfInterest'
                            label='Rate of Interest (p.a.)'
                            value={clearedRateOfInterest ? '' : rateOfInterest}
                            onChange={handleRateOfInterestChange}
                        />

                        <TextInput
                            id='timePeriod'
                            label={`Time Period (in ${timeUnit}(s))`}
                            value={clearedTimePeriod ? '' : timePeriod}
                            onChange={handleTimePeriodChange}
                        />
                    </div>
                </div>
                {calculateReturns()}
            </div>
            <div className='mt-6 border-[10px] rounded-lg mb-8 h-fit px-2 sm:px-8 py-4 select-none'>
                <div className='flex space-x-3 items-center justify-center mt-2 mb-4 text-[14px]'>
                    <div className={`rounded-lg px-2 py-1 border-2 cursor-pointer transition duration-300 ${active === "Scatter" && "bg-gray-200"}`} onClick={() => { setActive("Scatter") }}>Scatter</div>
                    <div className={`rounded-lg px-2 py-1 border-2 cursor-pointer transition duration-300 ${active === "Line" && "bg-gray-200"}`} onClick={() => { setActive("Line") }}>Line</div>
                    <div className={`rounded-lg px-2 py-1 border-2 cursor-pointer transition duration-300 ${active === "Bubble" && "bg-gray-200"}`} onClick={() => { setActive("Bubble") }}>Bubble</div>
                </div>

                <div className='w-full h-full'>
                    {active === "Scatter"
                        &&
                        <div>
                            <FDScatter investment={investment} rateOfInterest={rateOfInterest} timePeriod={timePeriod} />
                        </div>
                    }

                    {active === "Line"
                        &&
                        <div>
                            <FDLine investment={investment} rateOfInterest={rateOfInterest} timePeriod={timePeriod} />
                        </div>
                    }

                    {active === "Bubble"
                        &&
                        <div>
                            <FDBubble investment={investment} rateOfInterest={rateOfInterest} timePeriod={timePeriod} />
                        </div>
                    }
                </div>
            </div>
            <div className={`mt-6 border-[10px] rounded-lg mb-8 h-fit px-8 py-4 select-none ${JetBrains.className}`}>
                <div className='font-bold text-[20px] mb-2'>Information about Fixed Deposit</div>
                <div>
                    A Fixed Deposit (FD) is a low-risk investment offered by banks and financial institutions. It comprises depositing a quantity of money at a predetermined interest rate for a defined length of time. FDs provide safety, fixed returns, and government-backed insurance up to a specified amount. They are, however, less liquid, with early withdrawal penalties. Interest is usually taxed, and a minimum deposit is required.
                </div>
                <div className='my-4 font-bold'>M = P + ((P x r x t)/100)</div>
                <div>
                    The formula M represents the total amount you'll have in the end, where:
                    P is the initial deposit amount.
                    r is the annual interest rate.
                    t is the number of years the money is deposited or invested.
                </div>
            </div>
        </div>
    );
};

export default FixedDepositCalculator;
