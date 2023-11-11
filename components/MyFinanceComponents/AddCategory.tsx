"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const AddCategory = () => {
    const router = useRouter();

    const AddCate = async () => {
        await toast.promise(
            (async () => {
                await axios.post("/api/category", { name: "CardName" })
            })(),
            {
                loading: "Updating",
                success: "Success",
                error: "Try again"
            }
        )
        router.refresh()
    }
    return (
        <div>
            <div className='border-2 px-4 py-2 rounded-lg w-fit hover:bg-gray-200 cursor-pointer' onClick={AddCate}>
                Add category
            </div>
        </div>
    )
}

export default AddCategory