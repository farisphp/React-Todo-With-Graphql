import React from 'react'
import Todo from './Todo'
import { LoadingIcon } from '../assets/Icons'

const ListTodos = ({ header, loading, todos, error }) => {
    return (
        <div className="mb-4">
            {header}

            <div className={!loading ? 'hidden' : 'p-2'}>
                <LoadingIcon />
            </div>

            <ul className={!loading && !error ? '' : 'hidden'}>
                {todos?.map((todo, index) => {
                    return <Todo key={`todo-`+todo.id} {...todo}/>
                })}
                {todos === undefined || todos.length > 0 ? "" : <span className="mt-2">No todo</span>}
            </ul>

            <p className={error ? '' : 'hidden'}>
                {error}
            </p>
        </div>
    )
}

export default ListTodos
