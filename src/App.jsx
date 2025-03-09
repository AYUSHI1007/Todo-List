import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(todos);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (params) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id == id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="md:container bg-cyan-100 md:mx-auto my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2">
      <h1 className="font-bold text-center text-xl">iTask - Your Todo List Manager</h1>
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            className="bg-white p-1.5 rounded-md w-full"
            type="text"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-cyan-800 disabled:bg-cyan-600 hover:bg-cyan-900 p-1.5 text-white rounded-md w-full "
          >
            Add
          </button>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          id="show"
          checked={showFinished}
        /><label className="h-[1px] bg-black" htmlFor="show"></label>
        Show Finished Todos
        
        <hr />
        <h1 className="text-xl font-bold">Your Todos</h1>
        <div className="todos">
          {todos.length == 0 && <div className="">No Todos To Display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex w-full my-2 justify-between"
                >
                  <input
                    name={item.id}
                    type="checkbox"
                    onChange={handleCheckbox}
                    checked={item.isCompleted}
                    id=""
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-cyan-800 hover:bg-cyan-900 p-2.5 text-white rounded-md mx-1"
                    >
                      <AiOutlineEdit/>
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-cyan-800 hover:bg-cyan-900 p-2.5 text-white rounded-md mx-1"
                    >
                      <AiOutlineDelete/>
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
