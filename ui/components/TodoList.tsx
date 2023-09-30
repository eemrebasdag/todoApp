import Todos from "./Todos";

const getTodos = async () => {
  const res = await fetch("http://localhost:3000/api/", {
    next: {
      revalidate: 2,
    },
  });

  const data = await res.json();
  return data.data;
};

export default async function TodoList() {
  const todos = await getTodos();
  console.log(todos);
  return (
    <div className='flex flex-col gap-3 items-center w-full m-auto mt-4'>
      {todos.map((todo: any) => (
        <Todos
          key={todo.id}
          id={todo.id}
          name={todo.name}
          status={todo.status}
        ></Todos>
      ))}
    </div>
  );
}
