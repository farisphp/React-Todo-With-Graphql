import ListTodos from './components/ListTodos'
import { useQuery } from '@apollo/client'
import { GET_TODOS } from './lib/queries'
import { filterTodos } from './lib/helper'
import './App.css'
import TodoForm from './components/TodoForm'

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);
  return (
    <div className="container max-w-xl mx-auto p-2">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">TODO APPS</h1>
        <TodoForm />
      </div>

      <div className="mt-5">
        {/* List backlog todos */}
        <ListTodos
          header={<h3 className="py-1 px-2 bg-gray-200 rounded w-max">Backlog</h3>}
          loading={loading}
          todos={filterTodos(data?.listTodos, "status", "BACKLOG")}
          error={error}
        />

        {/* List in progress todos */}
        <ListTodos
          header={<h3 className="py-1 px-2 bg-purple-200 rounded w-max">In Progress</h3>}
          loading={loading}
          todos={filterTodos(data?.listTodos, "status", "IN_PROGRESS")}
          error={error}
        />

        {/* List done todos */}
        <ListTodos
          header={<h3 className="py-1 px-2 bg-green-200 rounded w-max">Done</h3>}
          loading={loading}
          todos={filterTodos(data?.listTodos, "status", "DONE")}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;
