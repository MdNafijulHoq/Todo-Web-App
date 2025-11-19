"use client";

import { useEffect, useState } from "react";
import CustomButtton from "../shared/CustomButton";
import CreateTodo from "./CreateTodo";
import SearchField from "./SearchField";
import { getTodo } from "@/services/todo/getTodo";
import { Todo } from "@/types/interfaces";
import TodoSkeleton from "../shared/TodoSkeleton";
import TodoCard from "./TodoCard";
import UpdateTodoModal from "./UpdateTodoModal";
import UpdateTodoSkeleton from "../shared/UpdateTodoSkeleton";
import NoContent from "../shared/NoContent";

const TodoHeader = () => {
  const [openNewTask, setOpenNewTask] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [singleTodo, setSingleTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [isUpdateModalLoading, setIsUpdateModalLoading] =
    useState<boolean>(false);
  const [saearchText, setSearchText] = useState<string>("");
  // console.log("todo from client", todos);
  // console.log("single todo data", singleTodo);
  // console.log("search text", saearchText);

  // Fetch lastest todos
  useEffect(() => {
    async function fetchTodo() {
      try {
        setIsLoading(true);
        const data = await getTodo(saearchText);
        // console.log({ data });
        setTodos(data);
      } catch (error) {
        console.error("Failed to fetch todo data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTodo();
  }, [saearchText]);

  const handleTodoUpdate = (updatedTodos: Todo[]) => {
    setTodos(updatedTodos);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Todos</h1>
        <CustomButtton word="New Task" onClick={() => setOpenNewTask(true)} />
      </div>

      <SearchField saearchText={saearchText} setSearchText={setSearchText} />

      <h3 className="text-black font-semibold text-[18px] mt-8 mb-5">
        Your Tasks
      </h3>

      {isLoading ? (
        <TodoSkeleton />
      ) : (
        <>
          {todos.length === 0 ? (
            <NoContent />
          ) : (
            <TodoCard
              todos={todos}
              setTodos={setTodos}
              openUpdateModal={() => setOpenUpdateModal(true)}
              setSingleTodo={setSingleTodo}
              updateModalLoading={setIsUpdateModalLoading}
            />
          )}
        </>
      )}

      {/* Open Create Todo modal */}
      {openNewTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <CreateTodo
            closeModal={() => setOpenNewTask(false)}
            setTodos={setTodos}
          />
        </div>
      )}

      {/* Open Update Modal */}
      {openUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          {isUpdateModalLoading ? (
            <UpdateTodoSkeleton />
          ) : (
            <UpdateTodoModal
              closeUpdateModal={() => setOpenUpdateModal(false)}
              singleTodo={singleTodo}
              onTodoUpdate={handleTodoUpdate}
            />
          )}
        </div>
      )}
    </>
  );
};

export default TodoHeader;
