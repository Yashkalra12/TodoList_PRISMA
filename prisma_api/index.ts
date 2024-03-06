import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
} from "./controllers/todo";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*", // or specify the actual origin of your frontend
  credentials: true,
}));

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Api_Prisma" });
});

app.get("/todos", async (req: Request, res: Response) => {
  try {
    const todos = await getTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await getTodo(Number(id));
    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/todos", async (req: Request, res: Response) => {
  try {
    const { desc } = req.body; //yash
    const newTodo = await createTodo(desc);
    res.json({ msg: "Todo added", success: true, newTodo: newTodo });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { desc, completed } = req.body;
    const { id } = req.params;
    await updateTodo(Number(id), desc, completed);
    res.json({ msg: "Todo updated" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteTodo(Number(id));
    res.json({ msg: "Todo deleted", success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/todos", async (req: Request, res: Response) => {
  try {
    await deleteAllTodos();
    res.json({ msg: "All todos deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}...`);
});
