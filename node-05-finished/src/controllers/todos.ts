import { RequestHandler } from 'express';

import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

// RequestHandler is a type provided by express, which is a type alias for a function type.
// RequestHandler 作用是告诉 express 这个函数是用来处理请求的，它接受三个参数，分别是 Request, Response, NextFunction
export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

// { id: string } 是一个泛型，表示这个 RequestHandler 接受一个参数，这个参数是一个对象，这个对象有一个 id 属性，类型是 string
export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  // as { text: string } 是告诉 TypeScript，我知道 req.body 是一个对象，这个对象有一个 text 属性，类型是 string，你不用再检查了
  const updatedText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error('Could not find todo!');
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.json({ message: 'Updated!', updatedTodo: TODOS[todoIndex] });
};

// { id: string } 是一个泛型，表示这个 RequestHandler 接受一个参数，这个参数是一个对象，这个对象有一个 id 属性，类型是 string
export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error('Could not find todo!');
  }

  TODOS.splice(todoIndex, 1);

  res.json({ message: 'Todo deleted!' });
};
