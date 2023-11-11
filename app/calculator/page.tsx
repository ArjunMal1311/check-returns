"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { JetBrains_Mono } from 'next/font/google';
import CalculatorCard from '@/components/Calculator/CalculatorCard';
const JetBrains = JetBrains_Mono({ subsets: ['latin'] });

interface Calculator {
    calculatorName: string;
    calculatorDescription: string;
    calculatorLink: string;
    visible: boolean;
}

const page: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Calculator[]>([]);
    const debounceDelay = 300;

    useEffect(() => {
        let debounceTimer: NodeJS.Timeout;

        const handleSearch = async () => {
            try {
                const response = await axios.get(`/api/search?query=${query}`);
                const searchResultsWithVisibility = response.data.data.map((calculator: Calculator) => ({
                    ...calculator,
                    visible: calculator.calculatorName.toLowerCase().includes(query.toLowerCase()),
                }));
                setSearchResults(searchResultsWithVisibility);
            } catch (error) {
                console.error('Error while searching:', error);
            }
        };

        const delayedSearch = () => {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }

            debounceTimer = setTimeout(handleSearch, debounceDelay);
        };

        delayedSearch();

        return () => {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
        };
    }, [query]);


    return (
        <div>
            <div className={`mx-16 text-center text-[35px] my-4 font-semibold `}>
                All Calculators
            </div>
            <div className='flex justify-center items-center'>
                <input
                    type="text"
                    placeholder={`Search by name`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className='border-2 px-4 py-2 rounded-lg mr-2 text-center'
                />
            </div>
            <div className='flex flex-wrap justify-center'>
                {searchResults
                    .filter((calculator) => calculator.visible)
                    .map((calculator) => (
                        <div key={calculator.calculatorName}>
                            <CalculatorCard calculatorDetails={calculator} />
                        </div>
                    ))}
            </div>

        </div>
    );
};

export default page;
