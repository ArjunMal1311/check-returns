import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';

const JetBrains = JetBrains_Mono({ subsets: ['latin'] });

const Footer = () => {
    return (
        <div className={`bg-[#11171A] text-white px-4 py-6 sm:py-8 md:py-10 lg:py-12 text-center ${JetBrains.className}`}>
            <div className='container mx-auto flex flex-col sm:flex-row justify-between'>
                <div className='mb-4 sm:mb-0 mt-4'>
                    <div className='font-bold text-lg mb-2'>Quick Links</div>
                    <ul className='flex flex-col sm:text-left'>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/calculator">Calculators</Link></li>
                        <li><Link href="/">Guides</Link></li>
                        <li><Link href="/profile">Profile</Link></li>
                    </ul>
                </div>

                <div className='mb-4 sm:mb-0 mt-4'>
                    <div className='font-bold text-lg mb-2'>Contact Us</div>
                    <p className='flex items-center justify-center cursor-pointer'>
                        <AiOutlineMail size={20} />
                        <span className='ml-2'>Gmail</span>
                    </p>
                </div>

                <div className='mt-4'>
                    <div className='font-bold text-lg mb-2'>Social</div>
                    <div className="flex space-x-2 items-center justify-center">
                        <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className='flex items-center'>
                            <FaInstagram size={20} />
                            <span className='ml-2'>Instagram</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
