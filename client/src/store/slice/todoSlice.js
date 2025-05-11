//name initialSyate reducers

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todoList : []
}


const todoReducer = createSlice({
    name:'todos',
    initialState:initialState,
    reducers:{

        addTodo(state,action){
            console.log(action);
            const newlyCreatedTodo = {
                id:state.todoList.length === 0 ? 1 : state.todoList.length+1,
                title:action.payload
            }

            state.todoList.push(newlyCreatedTodo)

            return state
        }

    }
})

export const {addTodo} = todoReducer.actions
export default todoReducer.reducer
