import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function Todo() {
  return (
    <div className='flex flex-col w-full px-4 xl:px-0'>
      <TodoForm></TodoForm>
      <TodoList></TodoList>
    </div>
  );
}
