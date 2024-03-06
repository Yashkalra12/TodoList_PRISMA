"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const todo_1 = require("./controllers/todo");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*", // or specify the actual origin of your frontend
    credentials: true,
}));
app.get("/", (req, res) => {
    res.json({ msg: "Api_Prisma" });
});
app.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield (0, todo_1.getTodos)();
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.get("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield (0, todo_1.getTodo)(Number(id));
        if (!todo) {
            res.status(404).json({ error: "Todo not found" });
            return;
        }
        res.json(todo);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.post("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { desc } = req.body; //yash
        const newTodo = yield (0, todo_1.createTodo)(desc);
        res.json({ msg: "Todo added", success: true, newTodo: newTodo });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.put("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { desc, completed } = req.body;
        const { id } = req.params;
        yield (0, todo_1.updateTodo)(Number(id), desc, completed);
        res.json({ msg: "Todo updated" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.delete("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, todo_1.deleteTodo)(Number(id));
        res.json({ msg: "Todo deleted", success: true });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.delete("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, todo_1.deleteAllTodos)();
        res.json({ msg: "All todos deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}...`);
});
