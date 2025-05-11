// store/slice/todoSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todoList: []
};

const todoReducer = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
        addTodo(state, action) {
            const newlyCreatedTodo = {
                id: state.todoList.length === 0 ? 1 : state.todoList.length + 1,
                title: action.payload
            };
            state.todoList.push(newlyCreatedTodo);
            return state;
        },

        deleteTodo(state, action) {
            state.todoList = state.todoList.filter(todoItem => todoItem.id !== action.payload);
            return state;
        },

        updateTodo(state, action) {
            const { id, title } = action.payload;
            const index = state.todoList.findIndex(item => item.id === id);
            if (index !== -1) {
                state.todoList[index] = {
                    ...state.todoList[index],
                    title: title
                };
            }
            return state;
        }
    }
});

export const { addTodo, deleteTodo, updateTodo } = todoReducer.actions;
export default todoReducer.reducer;
