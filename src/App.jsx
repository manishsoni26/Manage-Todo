import { useEffect, useState } from "react"
import { TodoProvider } from "./context/ToDoContext"
import TodoForm from "./components/TodoForm"
import TodoItem from "./components/TodoItem"
function App() {
  const [todos,setTodos]=useState([])
  const addTodo=(todo)=>{
    setTodos((prev)=>([todo,...prev]))
  }
  const deleteTodo=(id)=>{
    setTodos((prev)=>(
      prev.filter((tod)=>(tod.id!==id))
    ))
  }
  const updateTodo=(id,newTodo)=>{
    setTodos((prev)=>(
      prev.map((tod)=>(tod.id===id ? {...tod,todo:newTodo} :tod))
    ))
  }
  const toggleComplete=(id)=>{
    setTodos((prev)=>(
      prev.map((prevTodo)=>(prevTodo.id===id ? {...prevTodo,completed:!prevTodo.completed} : prevTodo))
    ))
  }

  useEffect(()=>{
    const storedTodos=localStorage.getItem("todo-items")
    if(storedTodos){
      try{
        const todoList=JSON.parse(storedTodos)
        if(Array.isArray(todoList))
          setTodos(todoList)
      }
      catch(e){
        console.log(e)
        setTodos([])
      }
    }
  },[])

  useEffect(()=>{
    if(todos.length>0){
      const todoList=localStorage.setItem("todo-items",JSON.stringify(todos))
    }
  },[todos])


  return (
    <TodoProvider value={{todos,addTodo,deleteTodo,updateTodo,toggleComplete}}>
    <div className="bg-[#15674c] h-screen py-8">
      <div className="w-full max-w-lg mx-auto shadow-lg rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */} 
            <TodoForm/>
          </div>
          <div className="flex flex-col gap-y-3">
            {/*Loop and Add TodoItem here */}
           {todos.map((todo)=>(
            <div key={todo.id} >{/* Each div is assigned a unique key using todo.id. This helps React track changes efficiently.*/}
              <TodoItem todoObj={todo}/>
            </div>
           ))}
          </div>
      </div>
    </div>
    </TodoProvider>
  )
}

export default App
