import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../../store/slice/todoSlice';

const TodoList = () => {

    const [currentTodo,setCurrentTodo] = useState('')
    console.log(currentTodo);

    const dispatch = useDispatch()
    const {todoList} = useSelector(state=>state.todo)
    
    console.log(todoList);
    

    function handleAddTodo(){
        dispatch(addTodo(currentTodo))
        setCurrentTodo('')
    }
    
  return (
    <div>
      <input type="text"  name='todo' placeholder='Enter your todo' 
        value={currentTodo} onChange={(e)=>setCurrentTodo(e.target.value)}
      />
      <button  disabled={currentTodo === ''} onClick={handleAddTodo}>Add Todo</button>
        <ul>
            {
                todoList && todoList.length > 0 ?
                todoList.map(todoItem=>
                <li key={todoItem.id}>{todoItem.title}
                <p>
                    <button>Delete</button>
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
