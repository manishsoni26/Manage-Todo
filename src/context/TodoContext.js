import { useContext,createContext } from "react";
export const TodoContext=createContext({
    todos:[
        {
            todo:"todo msg",
            id:1,
            completed:false
        },
    ],
    addTodo:(todo)=>{},
    deleteTodo:(id)=>{},
    updateTodo:(id,newTodo)=>{},
    toggleComplete:(id)=>{}
})
export const TodoProvider=TodoContext.Provider
export const useTodo=()=>useContext(TodoContext)