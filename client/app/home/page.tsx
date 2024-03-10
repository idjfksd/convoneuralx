'use client';
import React, { useState, useEffect } from 'react';
import { Dashboard } from './props';
import Link from 'next/link';
const Page: React.FC = () => {
    const [dislplayName, setDisplayName] = useState("Unknown");
    const [picURL, setPicURL] = useState("");
    document.title = "Home";
    useEffect(() => {
        setDisplayName("Shreyash Kumar")
        setPicURL("https://avatars.githubusercontent.com/u/147302693?v=4");
        return () => {
        }
    }, [dislplayName, picURL])

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <nav className="top-0 flex w-full border-b bg-gray-100">
                <div className="w-full px-4 py-2 flex justify-between items-center">
                    <div className="text-start">
                        <Link href="/">
                            <h1 className="text-gray-800 font-bold py-2 disable_select">Convoneuralx</h1>
                        </Link>
                    </div>
                    <div className="flex space-x-2">
                        <span className='text-blue-600 text-sm py-3 font-bold hover:underline cursor-pointer'>{dislplayName}</span>
                        <img src={picURL} alt="profile" className='rounded-full w-11 bg-white disable_select' />
                        <div className="h-11 w-11 flex items-center justify-center">
                            <span className="material-symbols-outlined cursor-pointer hover:border-gray-600 border active:opacity-70 disable_select active:bg-gray-400">
                                add
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
            <Dashboard />
            <div className="p-4">
                <h1 className='font-bold'>Your Models</h1>
                <div className="w-full text-center">
                    <span className='text-sm text-gray-600'>No models to show currently</span>
                </div>
            </div>
            <footer className="p-4 flex justify-center">
                <div className="w-full space-y-2 p-4 bg-black">
                    <a className='text-blue-800 text-sm cursor-pointer active:text-blue-600 active:scale-[0.9] transform duration-200' href=''>Explore Docs</a><br />
                    <a className='text-blue-800 text-sm cursor-pointer active:text-blue-600 active:scale-[0.9] transform duration-200' href=''>Explore Codebase</a>
                </div>
            </footer>
        </>
    )
}

export default Page;