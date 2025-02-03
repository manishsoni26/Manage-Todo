import { useEffect, useState } from "react"
import { TodoProvider } from "./context/TodoContext"
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
    <div className=" h-screen py-8 bg-cover" style={{backgroundImage:`url(https://img.freepik.com/free-photo/flat-lay-workstation-with-copy-space-laptop_23-2148430867.jpg?t=st=1738562060~exp=1738565660~hmac=687cad14f4a794e5243e96b512d944bccffd7d052b84ecb72eb802ab7285b2f1&w=1060`}}>
      <div className=" border-gray-60 backdrop-blur-sm bg-white/20 w-full max-w-lg mx-auto shadow-lg rounded-lg px-4 py-3 text-black">
        <h1 className="text-3xl font-extrabold text-center mb-8 mt-2 bg-gradient-to-r from-blue-800 to-red-800 bg-clip-text text-transparent">Manage Your Todos</h1>
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
