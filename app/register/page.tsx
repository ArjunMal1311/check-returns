"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { JetBrains_Mono } from 'next/font/google';
import { useRouter } from 'next/navigation';
import axios from "axios"
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
const JetBrains = JetBrains_Mono({ subsets: ['latin'] });

interface State {
    name: string;
    email: string;
    confirmemail: string;
    password: string;
}


const page = () => {
    const router = useRouter();
    const session = useSession();

    const initialState: State = {
        name: "",
        email: "",
        confirmemail: "",
        password: "",
    };

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/')
        }
    }, [session?.status, router]);

    const [state, setState] = useState(initialState);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (state.email !== state.confirmemail) {
            toast.error("Email & Confirm Email doesn't match")
            throw new Error("Email & Confirm Email doesn't match")
        }

        try {
            await toast.promise(
                (async () => {
                    try {
                        await axios.post("/api/register", state);

                        const result = await signIn("credentials", {
                            ...state,
                            redirect: false,
                        });

                        if (!result?.error) {
                            return 'Registration successful!';
                        } else {
                            throw new Error('Registration failed');
                        }
                    } catch (error) {
                        throw error;
                    }
                })(),
                {
                    loading: 'Registering...',
                    success: "Registered Successfully",
                    error: "Try Again",
                }
            );
            router.push('/');
            router.refresh();
        } catch (error) {
            console.log("Registration Error")
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const socialSignIn = async (action: string) => {
        signIn(action, { redirect: false }).then((callback: any) => {
            if (callback?.error) {
                toast.error('Invalid Credentials')
            }

            if (callback?.ok && !callback?.error) {
                toast.success('Logged In!')
                router.push("/calculator")
            }
        })
    }

    const socialAction = async (action: string) => {
        await toast.promise(
            signIn(action, { redirect: false }).then((callback: any) => {
                if (callback?.error) {
                    toast.error('Something Wrong happened')
                }

                if (callback?.ok && !callback?.error) {
                    router.push("/")
                }
            }),
            {
                loading: "Registering",
                success: "Success",
                error: "Try again"
            }
        )
    }

    return (
        <div>
            <div className='h-screen bg-gradient-to-r pt-8 from-[#f1f7f1] to-[#ebf4f8]'>
                <div className='flex flex-col justify-center items-center pt-8 '>
                    <div className='bg-gradient-to-r text-[20px] font-extrabold uppercase leading-[24.2px] tracking-widest md:text-[26px] md:leading-[30px] lg:leading-[36px] bg-clip-text mb-4 text-[#414141] lg:text-[32px]'>
                        CHECK RETURNS
                    </div>
                    <div className={`sm:text-[40px] text-[20px] font-bold text-[#414141] ${JetBrains.className}`}>
                        <span className='inline-block bg-clip-text text-transparent bg-gradient-to-l  from-[#5A32A3] to-[#D03592] mx-3'>
                            Register
                        </span>
                        to continue
                    </div>

                    <div className='w-[90%] mt-4 mb-8 border md:w-[460px] rounded-2xl pt-8 pb-6 px-7.5 border-gray-400 bg-white'>
                        <div onClick={() => socialAction('google')} className='px-4'>
                            <div className='flex items-center py-3 px-3 justify-center mr-2 w-full font-semibold rounded-lg text-lg leading-none gap-x-3 bg-blue-500 text-gray-100 hover:text-white select-none cursor-pointer hover:bg-blue-600'>Google</div>
                        </div>

                        <div className='h-[1.5px] bg-gray-100 w-11/12 mx-auto text-center mb-6 text-sm my-8 border-[1px]'>
                            <span className='relative -top-2.5 bg-white text-sm text-center px-2.5 select-none text-gray-500'>Or Continue With</span>
                        </div>

                        <form onSubmit={onSubmit}>
                            <div className='px-4 my-4'>
                                <div className='text-left select-none w-full text-gray-400 text-xs font-semibold uppercase truncate ml-3.5'>
                                    Name
                                </div>
                                <input className='text-sm pt-2 pb-2 pl-3 border-2 mt-1 pr-3 rounded-lg  text-gray-900 w-full' type="text" id='name' value={state.name} onChange={handleChange} name='name' placeholder="Your Name" />
                            </div>
                            <div className='px-4 my-4'>
                                <div className='text-left select-none w-full text-gray-400 text-xs font-semibold uppercase truncate ml-3.5'>
                                    Email
                                </div>
                                <input className='text-sm pt-2 pb-2 pl-3 border-2 mt-1 pr-3 rounded-lg  text-gray-900 w-full' type="email" id='email' value={state.email} onChange={handleChange} name='email' placeholder="Email Address" />
                            </div>
                            <div className='px-4 my-4'>
                                <div className='text-left select-none w-full text-gray-400 text-xs font-semibold uppercase truncate ml-3.5'>
                                    Confirm Email
                                </div>
                                <input className='text-sm pt-2 pb-2 pl-3 border-2 mt-1 pr-3 rounded-lg  text-gray-900 w-full' type="email" id='confirmemail' value={state.confirmemail} onChange={handleChange} name='confirmemail' placeholder="Confirm Email Address" />
                            </div>

                            <div className='px-4 my-4'>
                                <div className='text-left select-none w-full text-gray-400 text-xs font-semibold uppercase truncate ml-3.5'>
                                    Password
                                </div>
                                <input className='text-sm pt-2 pb-2 pl-3 border-2 mt-1 pr-3 rounded-lg  text-gray-900 w-full' type="password" id='password' value={state.password} onChange={handleChange} name='password' placeholder="Enter Password" />
                            </div>


                            <div className='flex justify-center items-center my-5'>
                                <button type='submit' className='w-fit px-5 py-1 text-[18px] select-none rounded-lg cursor-pointer bg-[#29ABE2] hover:bg-[#88d4f5] text-white font-semibold'>
                                    Register
                                </button>
                            </div>
                        </form>

                        <div className='flex justify-center space-x-2 items-center my-3'>
                            <div className='flex text-md text-gray-600'>Already an user?</div>
                            <div className='inline-flex text-md items-center font-semibold ml-3 text-[#29abe2] cursor-pointer' onClick={() => { router.push("/login") }}>Sign In</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page