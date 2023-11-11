"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { JetBrains_Mono } from 'next/font/google';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";
const JetBrains = JetBrains_Mono({ subsets: ['latin'] });

interface State {
    email: string;
    password: string;
}

const page = () => {
    const router = useRouter();
    const session = useSession();

    const initialState: State = {
        email: "",
        password: "",
    };

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/')
        }
    }, [session?.status, router]);


    const [state, setState] = useState<State>(initialState);
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await toast.promise(
            (async () => {
                const result = await signIn("credentials", {
                    ...state,
                    redirect: false,
                });

                if (!result?.error) {
                    router.push("/");
                    router.refresh();
                }
            })(),
            {
                loading: "Signing in",
                success: "Success",
                error: "Try again"
            }
        )
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.value });
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
                loading: "Loading",
                success: "Success",
                error: "Try again"
            }
        )
    }

    return (
        <div className='h-screen bg-gradient-to-r from-[#f1f7f1] to-[#ebf4f8] pt-8'>
            <div className='flex flex-col justify-center items-center pt-8 '>
                <div className='bg-gradient-to-r text-[20px] font-extrabold uppercase leading-[24.2px] tracking-widest md:text-[26px] md:leading-[30px] lg:leading-[36px] bg-clip-text mb-4 text-[#414141] lg:text-[32px]'>
                    CHECK RETURNS
                </div>
                <div className={`sm:text-[40px] text-[20px] font-bold text-[#414141] ${JetBrains.className}`}>
                    <span className='inline-block bg-clip-text text-transparent bg-gradient-to-l  from-[#5A32A3] to-[#D03592]  mx-3'>
                        Login
                    </span>
                    to continue
                </div>

                <div className='w-[90%] mt-4 mb-8 border md:w-[460px] rounded-2xl pt-8 pb-6 px-7.5 border-gray-400 bg-white'>
                    <div onClick={() => socialAction('google')} className='px-4'>
                        <div className='flex items-center py-3 px-3 justify-center mr-2 w-full font-semibold rounded-lg text-lg leading-none gap-x-3 bg-blue-500 text-gray-100 hover:text-white select-none hover:bg-blue-600 cursor-pointer'>Google</div>
                    </div>

                    <div className='h-[1.5px] bg-gray-100 w-11/12 mx-auto text-center mb-6 text-sm my-8 border-[1px]'>
                        <span className='relative -top-2.5 bg-white text-sm select-none text-center px-2.5 text-gray-500'>Or Continue With</span>
                    </div>

                    <form onSubmit={onSubmit}>

                        <div className='px-4'>
                            <div className='text-left w-full text-gray-400 select-none text-xs font-semibold uppercase truncate ml-3.5'>
                                Email
                            </div>
                            <input className='text-sm pt-2 pb-2 pl-3 border-2 mt-1 pr-3 rounded-lg  text-gray-900 w-full' type="email" id='email' value={state.email} onChange={handleChange} name='email' placeholder="Email Address" />
                        </div>

                        <div className='px-4 mt-3'>
                            <div className='text-left w-full text-gray-400 select-none text-xs font-semibold uppercase truncate ml-3.5'>
                                Password
                            </div>
                            <input className='text-sm pt-2 pb-2 pl-3 border-2 mt-1 pr-3 rounded-lg  text-gray-900 w-full' type="password" id='password' value={state.password} onChange={handleChange} name='password' placeholder="Enter Password" />
                        </div>

                        <button type='submit' className='flex justify-center items-center w-full my-5'>
                            <div className='w-fit px-5 py-1 text-[18px] rounded-lg bg-[#29ABE2] hover:bg-[#88d4f5] text-white font-semibold select-none'>
                                Log in
                            </div>
                        </button>
                    </form>

                    <div className='flex justify-center space-x-2 items-center my-3'>
                        <div className='flex text-md text-gray-600 select-none'>New to CR?</div>
                        <div className='inline-flex text-md items-center font-semibold ml-3 text-[#29abe2] cursor-pointer' onClick={() => router.push("/register")}>Sign Up</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page