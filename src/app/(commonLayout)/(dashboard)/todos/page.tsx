import TodoHeader from "@/components/todo/TodoHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TODO Page || ToDo Web App",
  description: "From here you can create, read, update and delete tod",
};

const TodoPage = () => {
  return (
    <div className="">
      <TodoHeader />
    </div>
  );
};

export default TodoPage;
