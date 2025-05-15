import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
    const apiResponse = await fetch('https://dummyjson.com/todos');
    const result = await apiResponse.json();
    return result;
});

const initialState = {
    todoList: [],
    loading: false,
    todoApi: [],
    isError: false
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
        },

        deleteTodo(state, action) {
            state.todoList = state.todoList.filter(todoItem => todoItem.id !== action.payload);
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.todoApi = action.payload.todos;
        });
        builder.addCase(fetchTodos.rejected, (state) => {
            state.loading = false;
            state.isError = true;
        });
    }
});

export const { addTodo, deleteTodo, updateTodo } = todoReducer.actions;
export default todoReducer.reducer;
