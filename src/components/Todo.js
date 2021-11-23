import React from 'react'
import TodoForm from './TodoForm'
import DeleteTodo from './DeleteTodo'

const Todo = ( props ) => {
    return (
        <li className="flex justify-between items-center my-2 shadow p-2 rounded">
            <p className="flex-1">{ props.content }</p>

            {/* Edit Modal */}
            <TodoForm todo={ props } />

            <DeleteTodo id={ props.id } />
        </li>
    )
}

export default Todo
