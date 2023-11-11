"use client"
import React, { useState } from 'react'
import { JetBrains_Mono } from 'next/font/google';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { MdDeleteOutline } from "react-icons/md"
import { BiEdit } from 'react-icons/bi';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi';
const JetBrains = JetBrains_Mono({ subsets: ['latin'] });

interface ExpenseCardProps {
    cardinfo: {
        id: string;
        name: string;
        items: Item[];
    }
}

interface Item {
    id: string;
    name: string;
    price: number;
    method: string;
}

const ExpenseCard = ({ cardinfo }: ExpenseCardProps) => {
    const router = useRouter();

    const [editingId, setEditingId] = useState("");
    const [editedName, setEditedName] = useState("");
    const [editedCardName, setEditedCardName] = useState(cardinfo.name);
    const [editedPrice, setEditedPrice] = useState(0);
    const [editedMethod, setEditedMethod] = useState('');

    const handleEditCardName = (id: string) => {
        setEditingId(id);
    };

    const handleSaveCardNameFunction = async () => {
        try {

            await toast.promise(
                (async () => {
                    await axios.patch('/api/category', {
                        id: cardinfo.id,
                        name: editedCardName,
                    });

                    setEditingId("");
                })(),
                {
                    loading: "Updating",
                    success: "Success",
                    error: "Try again"
                }
            )

        } catch (error) {
            toast.error("An error occurred");
        }

        router.refresh()
    };

    const handleEdit = (id: string) => {
        const currentItem = cardinfo.items.find((item) => item.id === id);

        if (currentItem) {
            setEditingId(id);
            setEditedName(currentItem.name);
            setEditedPrice(currentItem.price);
            setEditedMethod(currentItem.method);
        } else {
            console.error(`Item with id ${id} not found.`);
        }
    };

    const handleUpdateFunction = async (id: string) => {
        try {

            await toast.promise(
                (async () => {
                    try {
                        await axios.patch('/api/updateExpense', {
                            id,
                            name: editedName,
                            price: editedPrice,
                            method: editedMethod,
                        });

                        router.refresh();
                        setEditingId("");
                    } catch (error) {
                        toast.error('An error occurred while updating the item.');
                    }
                })(),
                {
                    loading: "Updating",
                    success: "Success",
                    error: "Try again"
                }
            )
            router.refresh()

        } catch (error) {
            toast.error("An error occurred");
        }
    };

    const AddItemFunction = async () => {
        try {

            await toast.promise(
                (async () => {
                    await axios.post("/api/view", { cardNumber: cardinfo.id });
                })(),
                {
                    loading: "Adding",
                    success: "Success",
                    error: "Try again"
                }
            )

        } catch (error) {
            toast.error("An error occurred");
        }

        router.refresh()
    }

    const DeleteItemFunction = async (viewID: string) => {
        try {

            await toast.promise(
                (async () => {
                    await axios.patch("/api/view", { viewInfo: viewID })
                })(),
                {
                    loading: "Deleting",
                    success: "Success",
                    error: "Try again"
                }
            )

        } catch (error) {
            toast.error("An error occurred");
        }

        router.refresh()
    }

    const handleDeleteCard = async () => {
        try {

            await toast.promise(
                (async () => {
                    console.log(cardinfo.id)
                    const res = await axios.patch("/api/deleteCategory", { id: cardinfo.id })
                    console.log(res)
                })(),
                {
                    loading: "Deleting",
                    success: "Success",
                    error: "Try again"
                }
            )

        } catch (error) {
            toast.error("An error occurred");
        }

        router.refresh()
    }

    const CancelCard = () => {
        setEditingId("")
    }

    return (
        <div className={`w-[250px] h-fit bg-white mx-8 my-8 rounded-lg ${JetBrains.className}`}>
            <div className='border rounded-lg bg-gray-200'>
                <div className='flex px-4 py-2 justify-between '>
                    <div className='flex space-x-2'>
                        <div className='w-[12px] h-[12px] bg-red-400 rounded-full hover:bg-red-600 cursor-pointer'></div>
                        <div className='w-[12px] h-[12px] bg-yellow-300 rounded-full hover:bg-yellow-600 cursor-pointer'></div>
                        <div className='w-[12px] h-[12px] bg-green-500 rounded-full hover:bg-green-600 cursor-pointer'></div>
                    </div>

                    <div className='flex space-x-4'>
                        {editingId === cardinfo.id ? <>
                            <div onClick={() => CancelCard()} className='cursor-pointer'><AiOutlineClose size={20} /></div>
                        </>
                            :
                            <>
                                <div onClick={() => handleEditCardName(cardinfo.id)} className='cursor-pointer'><FaEdit size={20} /></div>
                            </>}

                        <div onClick={() => handleDeleteCard()} className='cursor-pointer'><FiDelete size={20} /></div>
                    </div>
                </div>

                <div className='font-semibold mt-3 mb-4 text-center text-[20px] px-4 '>
                    {editingId === cardinfo.id ? (
                        <div className='flex-col flex items-center'>
                            <input
                                type='text'
                                value={editedCardName}
                                onChange={(e) => setEditedCardName(e.target.value)}
                                className='rounded-lg w-2/3 text-center'
                            />
                            <button onClick={handleSaveCardNameFunction} className='mt-1'>Save</button>
                        </div>
                    ) : (
                        <div className='flex flex-col'>
                            {editedCardName}
                        </div>
                    )}
                </div>

            </div>

            {cardinfo.items.map((card) => (
                <div className='my-4 border rounded-lg px-4 py-2' key={card.id}>
                    {editingId === card.id ? (
                        <div className='flex items-center flex-col'>
                            <input
                                type='text'
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                            <input
                                type='number'
                                value={editedPrice}
                                onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
                            />
                            <input
                                type='text'
                                value={editedMethod}
                                onChange={(e) => setEditedMethod(e.target.value)}
                            />
                            <div className='flex space-x-2'>
                                <button onClick={() => handleUpdateFunction(card.id)} className='px-4 py-1 rounded-2xl bg-gray-200 hover:bg-gray-400'>Save</button>
                                <button onClick={() => CancelCard()}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div className='flex justify-between items-center'>
                            <div className='border bg-gray-200 hover:bg-gray-400 p-1 rounded-lg cursor-pointer' onClick={() => DeleteItemFunction(card.id)}>
                                <MdDeleteOutline size={22} />
                            </div>
                            <div className='text-center text-[18px] font-normal'>{card.name}</div>
                            <div className='border bg-gray-200 hover:bg-gray-400 p-1 rounded-lg cursor-pointer' onClick={() => { handleEdit(card.id) }}>
                                <BiEdit size={20} />
                            </div>
                        </div>
                    )}
                    <div className='mt-4 flex justify-between'>
                        <div>
                            <span className='text-[12px]'>₹</span>
                            {card.price}
                        </div>
                        <div>{card.method}</div>
                    </div>
                </div>
            ))}


            <div onClick={AddItemFunction} className='cursor-pointer hover:bg-gray-400 w-fit px-3 py-2 rounded-lg mt-3 bg-gray-200'><FaPlus /></div>
        </div>
    )
}

export default ExpenseCard