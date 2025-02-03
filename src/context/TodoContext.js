import { useContext,createContext } from "react";
const TodoContext=createContext({
    todos:[
        {
            id:1,
            todo:"todo msg",
            completed:false
        },
    ],
    deleteTodo:(id)=>{},
    addTodo:(todo)=>{},
    updateTodo:(id,newTodo)=>{},
    toggleComplete:(id)=>{}
});
export const TodoProvider=TodoContext.Provider;
export const useTodo=()=>useContext(TodoContext);