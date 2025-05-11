

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, fetchTodos, updateTodo } from '../../store/slice/todoSlice';

const TodoList = () => {
    const [currentTodo, setCurrentTodo] = useState('');
    const [currentEditedId, setCurrentEditedId] = useState(null);

    const dispatch = useDispatch();
    const { todoList, todoApi, loading } = useSelector(state => state.todo);

    function handleAddTodo() {
        dispatch(addTodo(currentTodo));
        setCurrentTodo('');
    }

    function handleTodoDelete(id) {
        dispatch(deleteTodo(id));
    }

    function handleTodoUpdate(todo) {
        setCurrentEditedId(todo.id);
        setCurrentTodo(todo.title);
    }

    function handleUpdateTodo() {
        dispatch(updateTodo({
            id: currentEditedId,
            title: currentTodo
        }));
        setCurrentTodo('');
        setCurrentEditedId(null);
    }

    function ApiTodoFetch() {
        dispatch(fetchTodos());
    }

    if (loading) {
        return <h1>Fetching data please wait...</h1>;
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Enter your todo"
                value={currentTodo}
                onChange={(e) => setCurrentTodo(e.target.value)}
            />
            <button
                disabled={currentTodo === ''}
                onClick={currentEditedId !== null ? handleUpdateTodo : handleAddTodo}
            >
                {currentEditedId !== null ? 'Edit Todo' : 'Add Todo'}
            </button>

            <h3>Local Todos</h3>
            <ul>
                {todoList && todoList.length > 0 ? (
                    todoList.map(todo => (
                        <li key={todo.id}>
                            {todo.title}
                            <p>
                                <button onClick={() => handleTodoDelete(todo.id)}>Delete</button>
                                <button onClick={() => handleTodoUpdate(todo)}>Update</button>
                            </p>
                        </li>
                    ))
                ) : (
                    <li>No local todos</li>
                )}
            </ul>

            <button onClick={ApiTodoFetch}>Fetch API Todos</button>

            <h3>API Todos</h3>
            <ul>
                {todoApi && todoApi.length > 0 ? (
                    todoApi.map(apiTodo => (
                        <li key={apiTodo.id}>{apiTodo.todo}</li> // Use .todo, not .title
                    ))
                ) : (
                    <li>No API todos fetched</li>
                )}
            </ul>
        </div>
    );
};

export default TodoList;
