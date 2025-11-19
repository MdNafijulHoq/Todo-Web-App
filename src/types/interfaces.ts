import { ReactNode } from "react";

export interface IUserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  contact_number: string;
  birthday: string | null;
  profile_image: string | null;
  bio: string;
}

export interface IFormData {
  firstName: string;
  lastName: string;
  bio: string;
  address: string;
  contactNumber: string;
  birthday: string;
}

export interface LabelWithInputProps {
  label: string;
  placeHolder: string;
  name: string;
  value?: string;
  readOnly?: boolean;
  inputClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ICustomBtn {
  word: string;
  onClick?: () => void;
}

export interface IValues {
  title: string;
  formattedDate: string;
  priority: string;
  description: string;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  priority: string;
  todo_date: string;
  is_completed?: boolean;
}
export interface IDeleteProps {
  children: ReactNode;
  onConfirm: () => void;
}

export interface TodoFormState {
  title: string;
  formattedDate: string;
  priority: string;
  description: string;
  is_completed: boolean;
}

export interface IUpdateTodo {
  closeUpdateModal: () => void;
  singleTodo: Todo | null;
  onTodoUpdate: (todos: Todo[]) => void;
}

export interface IUpdateValues {
  title: string;
  formattedDate: string;
  priority: string;
  description: string;
  is_completed: boolean;
}

export interface ICreateTodo {
  closeModal: () => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export interface UserState {
  user: IUserData | null;
  setUser: (data: IUserData | null) => void;
}

export interface IChangePassValues {
  oldpass: string;
  newpass: string;
}
