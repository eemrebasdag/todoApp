"use client";

import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const postTodo = async (name: string) => {
  const res = await fetch("http://localhost:3000/api/", {
    method: "POST",
    body: JSON.stringify({ name, status: "Pending" }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

export default function TodoForm() {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (nameRef.current && nameRef.current.value !== "") {
      await postTodo(nameRef.current.value);
      nameRef.current.value = "";
    }
  };

  return (
    <div className='w-full m-auto'>
      <form className='w-full' onSubmit={handleSubmit}>
        <div className='w-full h-[46px] flex items-center  gap-3'>
          <input
            type='text'
            ref={nameRef}
            placeholder='Add todo'
            className='border-2  w-2/3 h-full border-gray-300 px-4 py-2 rounded-lg outline-none focus:outline-none focus:border-black transition focus:transition'
          />
          <button
            type='submit'
            className=' flex items-center justify-center gap-2 bg-black h-full text-white w-1/3 px-6  rounded-lg focus:bg-white border-2 border-black focus:text-black transition focus:transition'
          >
            Add
            <PlusCircleIcon className='h-full w-[20px] hidden md:block' />
          </button>
        </div>
      </form>
    </div>
  );
}
