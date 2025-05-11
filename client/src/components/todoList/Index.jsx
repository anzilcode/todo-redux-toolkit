import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, updateTodo } from '../../store/slice/todoSlice';

const TodoList = () => {

    const [currentTodo, setCurrentTodo] = useState('')
    const [currentEditedId, setCurrentEditedId] = useState(null)
    console.log(currentTodo);

    const dispatch = useDispatch()
    const { todoList } = useSelector(state => state.todo)

    console.log(todoList);

    function handleAddTodo() {
        dispatch(addTodo(currentTodo))
        setCurrentTodo('')
    }

    function handleTodoDelete(currentId) {
        dispatch(deleteTodo(currentId))
    }

    function handleTodoUpdate(currentEditedTodo) {
        setCurrentEditedId(currentEditedTodo.id)
        setCurrentTodo(currentEditedTodo.title)
    }

    function handleUpdateTodo() {
        dispatch(updateTodo({
            id: currentEditedId,
            title: currentTodo
        }))
        setCurrentTodo('')
        setCurrentEditedId(null)
    }

    return (
        <div>
            <input type="text" name='todo' placeholder='Enter your todo'
                value={currentTodo} onChange={(e) => setCurrentTodo(e.target.value)}
            />
            <button disabled={currentTodo === ''} onClick={currentEditedId !== null ? handleUpdateTodo : handleAddTodo}>
                {
                    currentEditedId !== null ? 'Edit Todo' : 'Add todo'
                }
            </button>
            <ul>
                {
                    todoList && todoList.length > 0 ?
                        todoList.map(todoItem =>
                            <li key={todoItem.id}>{todoItem.title}
                                <p>
                                    <button onClick={() => handleTodoDelete(todoItem.id)}>Delete</button>
                                    <button onClick={() => handleTodoUpdate(todoItem)}>Update</button>
                                </p>
                            </li>
                        )
                        : null
                }
            </ul>
        </div>
    )
}

export default TodoList

