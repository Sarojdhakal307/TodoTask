import api from "@/api/axios";
import { getUserId } from "@/lib/authLib";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const getUserTodos = async (): Promise<Todo[]> => {
  const userid = await getUserId();
  const response = await api.get(`/users/${userid}/todos`);
  return response.data;
};
