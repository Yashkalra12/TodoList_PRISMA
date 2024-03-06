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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllTodos = exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodo = exports.getTodos = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.todo.findMany({});
    });
}
exports.getTodos = getTodos;
function getTodo(todoId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.todo.findUnique({
            where: {
                id: todoId,
            },
        });
    });
}
exports.getTodo = getTodo;
function createTodo(todoDesc) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.todo.create({
            data: {
                todo_desc: todoDesc,
            },
        });
    });
}
exports.createTodo = createTodo;
function updateTodo(todoId, todoDesc, todoCompleted) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.todo.update({
            where: {
                id: todoId,
            },
            data: {
                todo_desc: todoDesc,
                todo_completed: todoCompleted,
            },
        });
    });
}
exports.updateTodo = updateTodo;
function deleteTodo(todoId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.todo.delete({
            where: {
                id: todoId,
            },
        });
    });
}
exports.deleteTodo = deleteTodo;
function deleteAllTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.todo.deleteMany({});
    });
}
exports.deleteAllTodos = deleteAllTodos;
