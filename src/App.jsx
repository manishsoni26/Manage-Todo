import { useEffect, useState } from "react"
import { TodoProvider } from "./context/ToDoContext"
import { TodoForm, TodoItem } from "./components"
function App() {
  const [todos,setTodos]=useState([])
  
  // const [arr, setArr] = useState([1,2,3,4])
// setArr((prev) => {
//   const newArr = [...prev, 7]
//   console.log(newArr)  // This will show the new array
//   return newArr
// })

  const addTodo=(todo)=>{
    setTodos((prev)=>[todo,...prev])
  }
  const updateTodo=(id,todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id ?todo:prevTodo)))
  }
  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>todo.id!==id))
  }
  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id ?{...prevTodo,completed:!prevTodo.completed} : prevTodo)))
  }
  useEffect(()=>{
    const storedTodos = localStorage.getItem("todos");
  
  if (storedTodos) {
    try {
      const todoList = JSON.parse(storedTodos);
      if (Array.isArray(todoList)) {
        setTodos(todoList);
      }
    } catch (error) {
      console.error("Error parsing todos from localStorage:", error);
      setTodos([]); // Reset to an empty array in case of invalid JSON
    }
  }
  },[])
  useEffect(()=>{
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  },[todos])


  return (
    <>
    <TodoProvider value={{todos,addTodo,deleteTodo,updateTodo,toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */} 
            <TodoForm/>
          </div>
          <div className="flex flex-col gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo)=>(
              <div key ={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
      </div>
    </div>
    </TodoProvider>
    </>
  )
}

export default App
