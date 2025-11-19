"use client";

import { Todo } from "@/types/interfaces";
import { formatDate, getPriorityColor } from "@/utils/helperFunction";
import { Pencil, Trash, CheckCircle2 } from "lucide-react";
import DeleteConfirmation from "../shared/DeleteConfirmation";
import { deleteTodo } from "@/services/todo/deleteTodo";
import { toast } from "sonner";
import { getTodo } from "@/services/todo/getTodo";
import { getSingleTodo } from "@/services/todo/getSingleTodo";

const TodoCard = ({
  todos,
  setTodos,
  openUpdateModal,
  setSingleTodo,
  updateModalLoading,
}: {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  openUpdateModal: () => void;
  setSingleTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  updateModalLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleUpdate = async (id: number) => {
    // console.log("Updated todo is", id);
    updateModalLoading(true);
    const data = await getSingleTodo(Number(id));
    setSingleTodo(data);
    openUpdateModal();
    updateModalLoading(false);
  };

  const handleRemove = async (id: number) => {
    try {
      const result = await deleteTodo(id);
      //   console.log({ result });
      if (result.success) {
        toast.success(result.message);
        const updatedTodos = await getTodo();
        setTodos(updatedTodos);
      } else {
        toast.error(result.message || "Failed to delete todo");
      }
    } catch (error) {
      console.error("Error in Remove Todo:", error);
      toast.error("An error occurred while deleting the todo");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {todos.map((todo: Todo) => (
        <div
          key={todo.id}
          className={`border rounded-xl p-5 hover:shadow-lg transition-all duration-300 flex flex-col h-full ${
            todo.is_completed
              ? "bg-green-50 border-green-200"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex justify-between items-start gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <h3
                className={`text-lg font-semibold line-clamp-2 ${
                  todo.is_completed
                    ? "text-green-800 line-through"
                    : "text-gray-900"
                }`}
              >
                {todo.title}
              </h3>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(
                  todo.priority
                )}`}
              >
                {todo.priority}
              </span>
              {todo.is_completed && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-medium">Done</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 mb-4">
            <p
              className={`text-sm leading-relaxed ${
                todo.is_completed
                  ? "text-green-700 line-clamp-3"
                  : "text-gray-600 line-clamp-4"
              }`}
            >
              {todo.description}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 font-medium">
              Due: {formatDate(todo.todo_date)}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => handleUpdate(todo.id)}
                className="p-2 text-blue-600 bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer"
                title="Edit todo"
              >
                <Pencil className="w-4 h-4" />
              </button>

              <DeleteConfirmation onConfirm={() => handleRemove(todo.id)}>
                <div
                  className="p-2 text-red-600 bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
                  title="Delete todo"
                >
                  <Trash className="w-4 h-4" />
                </div>
              </DeleteConfirmation>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoCard;
