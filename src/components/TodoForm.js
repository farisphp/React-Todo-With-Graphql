import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import Modal from './Modal'
import { useMutation } from '@apollo/client'
import { GET_TODOS, ADD_TODO, EDIT_TODO } from '../lib/queries'
import { AddIcon, EditIcon } from '../assets/Icons'

const TodoForm = ({ todo }) => {
    const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm();
    const [addTodo, { loading: loadingAdd, error: errorAdd }] = useMutation (ADD_TODO, {
        refetchQueries: [
            GET_TODOS, // DocumentNode object parsed with gql
            'GetTodos' // Query name
        ],
    });

    const [editTodo, { loading: loadingEdit, error: errorEdit }] = useMutation (EDIT_TODO, {
        refetchQueries: [
            GET_TODOS, // DocumentNode object parsed with gql
            'GetTodos' // Query name
        ],
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (todo) {
            setValue("content", todo.content);
            setValue("status", todo.status);
        }
    }, [todo, setValue])

    const onSubmit = form => {
        if (todo) {
            editTodo({ variables: { id: todo.id, content: form.content, status: form.status }});
        } else {
            addTodo({ variables: { content: form.content, status: form.status }});
        }
        
        reset({ content: '' }); // Reset form
        setShowModal(false);
    }
    
    const Form = () => {
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="p-2">
                <div className="my-2">
                    <label className="block">Todo Content</label>
                    <input className="border border-black w-full p-1 rounded" {...register("content", { required: true })} />
                    {errors.content?.type === 'required' && "Todo content is required"}
                </div>
                
                <div className="my-2">
                    <label className="block">Status</label>
                    <select className="border border-black w-full p-1 rounded" {...register("status", { required: true })}>
                        <option value="BACKLOG">Backlog</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                    </select>
                </div>

                <span className={errorAdd || errorEdit ? 'text-red-600' : 'hidden'} datatestid="error-test">Ooops, there is something wrong</span>
                
                <div className="flex justify-end">
                    <input 
                        type="submit" 
                        value="Save" 
                        className="py-2 px-4 bg-green-400 text-white rounded hover:shadow ease-linear transition-all duration-150 cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-auto" 
                        disabled={loadingAdd || loadingEdit}
                    />
                </div>
                
            </form>
        )
    }

    const btnToggle = () => {
        if (todo) return (
            <button 
                className="p-1 hover:shadow ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
                datatestid="btnEdit"
            >
                <EditIcon />
            </button>
        )

        return (
            <button
                className="active:bg-pink-600 font-bold uppercase text-sm p-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
                datatestid="btnAdd"
            >
                <AddIcon />
            </button>
        )
    }
        
        
    return (
        <Modal
            showModal={ showModal }
            setShowModal={ setShowModal }
            content={ Form } 
            title={todo ? "Edit Todo" : "Add Todo"} 
            btnToggle={ btnToggle } 
            loading={ todo ? loadingEdit : loadingAdd }
            error={ todo ? errorEdit : errorAdd }
        />
    );
}

export default TodoForm
