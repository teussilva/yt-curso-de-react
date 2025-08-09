import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // useEffect(() => {
  //   const carregarDados = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://jsonplaceholder.typicode.com/todos?_limit=10"
  //       );
  //       const data = await response.json();

  //       if (Array.isArray(data)) {
  //         setTasks(data);
  //       } else {
  //         console.error("API não retornou um array", data);
  //       }
  //     } catch (error) {
  //       console.error("Erro ao carregar API:", error);
  //     }
  //   };
  // SE QUISER, VOCÊ PODE CHAMR UMA API PARA PEGARR AS TAREFAS
  //   carregarDados();
  // }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      // PRECISO ATUALIZAR ESSA TAREFA
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      // NÃO PRECISO ATUALIZAR ESSA TAREFA
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTask(id) {
    const deleteTask = tasks.filter((task) => task.id !== id);
    setTasks(deleteTask);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center items-start p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTask={onDeleteTask}
        />
      </div>
    </div>
  );
}

export default App;
