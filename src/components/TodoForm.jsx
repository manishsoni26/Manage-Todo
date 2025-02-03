import React, { useState } from "react";
import { useTodo } from "../context/ToDoContext";
import { BookmarkPlus } from 'lucide-react';
function TodoForm() {
   const {addTodo}=useTodo()
   const [todo,setTodo]=useState("")
   const handleSubmit=(e)=>{
    e.preventDefault();
    if(todo){
        addTodo({
            id:Date.now(),
            completed:false,
            todo:todo
        })
        setTodo("")
    }
   }

    return (
        <form onSubmit={handleSubmit} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border placeholder:text-slate-300 border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/10 py-1.5"
                value={todo}
                onChange={(e)=>setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
            <BookmarkPlus />
            </button>
        </form>
    );
}

export default TodoForm;

