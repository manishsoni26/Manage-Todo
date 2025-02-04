import React, { useState } from "react";
import { FilePenLine ,Save} from 'lucide-react';
import { useTodo  } from "../context/TodoContext";
function TodoItem({ todoObj }) {
    const {deleteTodo,updateTodo,toggleComplete}=useTodo()
    const [editable,setEditable]=useState(false)
    const [todoMsg,setTodoMsg]=useState(todoObj.todo)
   const togglecompleted=()=>{
    toggleComplete(todoObj.id)
   }
   const editTodo=()=>{
        if(!todoMsg){
            alert("Please Enter Something")
        }
        else{
            updateTodo(todoObj.id,todoMsg)
            setEditable(false)
        }
   }
    return (
        <div
            className={`flex  rounded-lg px-3 py-1.5 gap-x-3 shadow-lg shadow-black/50 duration-300  text-black ${
                todoObj.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                onChange={togglecompleted}
                checked={todoObj.completed}
                disabled={editable}
            />
            <input
                type="text"
                value={todoMsg}
                onChange={(e)=>setTodoMsg(e.target.value)}
                readOnly={!editable}
                className={`border outline-none w-full rounded-lg px-1 bg-transparent
                    ${editable ? 'bg-white border-black/30 ':' cursor-default border-none'}
                    ${todoObj.completed ? 'line-through' :''}
                    `}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                disabled={todoObj.completed}
                onClick={()=>{
                    if(editable)
                        editTodo()
                    else
                    setEditable((prev)=>!prev)
                }}
            >
                {editable ? <Save className="text-[#15674c]" /> :<FilePenLine  className="text-[#15674c]"/>}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={()=>deleteTodo(todoObj.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
