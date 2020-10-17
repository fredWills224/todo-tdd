const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');
const allTodos = require('../mock-data/all-todos.json');

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();

let req, res, next;
beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('TodoController.getTodos', ()=>{

    it('should have a getTodos function', ()=>{
        expect(typeof TodoController.getTodos).toBe('function');
    });

    it('should call TodoModel.find({})', async ()=>{
        await TodoController.getTodos(req, res, next);
        expect(TodoModel.find).toHaveBeenCalledWith({});
    });

    it('should return response with status 200 and all todos', async ()=>{
        TodoModel.find.mockReturnValue(allTodos);
        await TodoController.getTodos(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();//response is sent
        expect(res._getJSONData()).toStrictEqual(allTodos);
    });

});

describe('TodoController.createTodo', ()=>{
    
    beforeEach(()=>{
        req.body = newTodo;
    });

    it('should have a createTodo function', ()=>{
        expect(typeof TodoController.createTodo).toBe('function');
    });

    it('should call TodoModel.create with req.body', ()=>{
        TodoController.createTodo(req, res, next);
        expect(TodoModel.create).toBeCalledWith(newTodo);
    });

    it('should return 201 response code', async ()=>{
        await TodoController.createTodo(req, res, next);
        //when creating a new resource in rest a status of 201 should be returned
        expect(res.statusCode).toBe(201);
        //insure response has been sent back
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async ()=>{
        TodoModel.create.mockReturnValue(newTodo);
        await TodoController.createTodo(req, res, next);
        //[toStrictEqual()] is used insted of [toBe()] because [newTodo] and
        //[creatModel] have different reference numbers in memory
        expect(res._getJSONData()).toStrictEqual(newTodo);        
    });

    it('should handle errors', async ()=>{
        const errorMessage = { message: "Done property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.create.mockReturnValue(rejectedPromise);
        await TodoController.createTodo(req, res, next);
        expect(next).toBeCalledWith(errorMessage); 
    });

});









