"use client";

import { MinusCircleIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

const deleteTodo = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/${id}`, {
    method: "DELETE",
    next: {
      revalidate: 2,
    },
  });

  return (await res).json();
};

const updateTodo = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/${id}`, {
    method: "PUT",
    next: {
      revalidate: 2,
    },
  });

  return (await res).json();
};

export default function Todos({
  id,
  name,
  status,
}: {
  id: number;
  name: string;
  status: string;
}) {
  const router = useRouter();
  return (
    <div className=' border-2 w-full py-2 px-4 rounded-xl flex justify-between items-center'>
      <h3>{name}</h3>
      <p>{status}</p>
      <div className='flex gap-2'>
        <button>
          <MinusCircleIcon
            className='w-[30px] h-full cursor-pointer hover:text-white hover:bg-black hover:rounded-full'
            onClick={() => {
              deleteTodo(id);
            }}
          ></MinusCircleIcon>
        </button>
        <button>
          <CheckCircleIcon
            className='w-[30px] h-full cursor-pointer hover:text-white hover:bg-black hover:rounded-full'
            onClick={() => updateTodo(id)}
          ></CheckCircleIcon>
        </button>
      </div>
    </div>
  );
}
