import { RequestHandler } from 'express';

import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

// RequestHandler is a type provided by express, which is a type alias for a function type.
// RequestHandler 作用是告诉 express 这个函数是用来处理请求的，它接受三个参数，分别是 Request, Response, NextFunction
export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as {text: string}).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({message: 'Created the todo.', createdTodo: newTodo});
};