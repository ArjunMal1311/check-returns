"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Inter } from 'next/font/google'
import { HiOutlineMenuAlt1 } from "react-icons/hi"
import { useRouter } from 'next/navigation';
import { JetBrains_Mono } from 'next/font/google';
import { signOut } from 'next-auth/react';
import Avatar from './NavProfile';
import Link from 'next/link';
import Image from 'next/image';
const JetBrains = JetBrains_Mono({ subsets: ['latin'] });
const InterScript = Inter({ subsets: ['latin'] });

interface UserProps {
    currentUser: {
        createdAt: string;
        updatedAt: string;
        id: string;
        name: string | null;
        image: string | null;
        email: string | null;
        isAdmin: boolean | null;
        password: string | null;
    } | null
}

const Navbar = ({ currentUser }: UserProps) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const closeDropdown = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && event.target && 'contains' in dropdownRef.current) {
                if (!(dropdownRef.current as Node).contains(event.target as Node)) {
                    closeDropdown();
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    return (
        <div className={`flex justify-center w-full border-b-2 select-none ${InterScript.className}`}>
            <div className='flex items-center justify-between w-[1200px] gap-4 md:gap-0 mx-6 my-2 pt-2'>
                <div className='flex items-center space-x-2 cursor-pointer' onClick={() => { router.push("/") }}>
                    <Image src={"/logo.png"} height={40} width={40} alt="" />
                    <div className={`sm:text-[15px] text-[10px] font-extrabold uppercase leading-[24.2px] tracking-widest ${JetBrains.className}`}>Check Returns</div>
                </div>
                <div className='relative' ref={dropdownRef}>
                    <div className='flex flex-row items-center gap-3'>

                        <Link href='/calculator' className='text-bold border-2  hover:bg-gray-200 border-neutral-200  px-3 py-1 rounded-lg cursor-pointer' >
                            Calculators
                        </Link>

                        <div onClick={toggleOpen} className='p-4 md:py-2 md:px-3 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition' >
                            <HiOutlineMenuAlt1 />
                            <div className="hidden md:block">
                                <Avatar src={currentUser?.image} />
                            </div>
                        </div>

                        {isOpen && (
                            <div className='absolute z-50 rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm hover:cursor-pointer border-2'>
                                <div>
                                    {currentUser ? (
                                        <>
                                            <div className='px-4 py-3 hover:bg-neutral-300 transition font-semibold cursor-pointer' onClick={() => router.push('/profile')}>Hello, {currentUser.name}</div>
                                            <div className='px-4 py-3 hover:bg-neutral-300 transition font-semibold cursor-pointer' onClick={() => router.push('/mycalculations')}>My Calculations</div>
                                            <div className='px-4 py-3 hover:bg-neutral-300 transition font-semibold cursor-pointer' onClick={() => router.push('/myfinance')}>My Finance</div>
                                            <div className='px-4 py-3 hover:bg-neutral-300 transition font-semibold cursor-pointer' onClick={() => signOut()}>Sign Out</div>
                                        </>

                                    ) : (
                                        <>
                                            <div className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer' onClick={() => router.push('/login')}>Login</div>
                                            <div className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer' onClick={() => router.push('/register')}>Register</div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar