import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Todo {
  id: number;
  todo_desc: string;
  todo_completed: boolean;
}

async function getTodos(): Promise<Todo[]> {
  return await prisma.todo.findMany({});
}

async function getTodo(todoId: number): Promise<Todo | null> {
  return await prisma.todo.findUnique({
    where: {
      id: todoId,
    },
  });
}

async function createTodo(todoDesc: string): Promise<Todo> {
  return await prisma.todo.create({
    data: {
      todo_desc: todoDesc,
    },
  });
}

async function updateTodo(todoId: number, todoDesc: string, todoCompleted: boolean): Promise<void> {
  await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: {
      todo_desc: todoDesc,
      todo_completed: todoCompleted,
    },
  });
}

async function deleteTodo(todoId: number): Promise<void> {
  await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });
}

async function deleteAllTodos(): Promise<void> {
  await prisma.todo.deleteMany({});
}

export {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
};
