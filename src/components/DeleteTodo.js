import React, { useState } from 'react'
import Modal from './Modal'
import { useMutation } from '@apollo/client'
import { GET_TODOS, DELETE_TODO } from '../lib/queries'
import { RemoveIcon } from '../assets/Icons'

const DeleteTodo = ({ id }) => {
    const [deleteTodo, { loading, error }] = useMutation (DELETE_TODO, {
        refetchQueries: [
            GET_TODOS, // DocumentNode object parsed with gql
            'GetTodos' // Query name
        ],
    });

    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        deleteTodo({ variables: { id: id }});

        if (!error){
            setShowModal(false);
        }
    }

    const btnToggle = () => {
        return (
            <button 
                className="text-red-600 p-1 hover:shadow ease-linear transition-all duration-150"
                onClick={() => setShowModal(true)}
                datatestid="deleteToggle"
            >
                <RemoveIcon />
            </button>
        )
    }

    const deleteView = () => {
        return (
            <div className="mt-4 text-center">
                <h4>Are you sure ?</h4>

                <span className={error ? 'text-red-600' : 'hidden'}>Ooops, there is something wrong</span>

                <div className="flex justify-end mt-4">
                    <button 
                        className="bg-red-600 text-white py-2 px-4 rounded hover:shadow ease-linear transition-all duration-150 flex items-center disabled:opacity-50 disabled:cursor-auto"
                        onClick={handleDelete}
                        disabled={loading}
                        datatestid="btnDelete"
                    >
                        <RemoveIcon />
                        <span>Delete</span>
                        
                    </button>
                </div>
            </div>
            
        )
    }

    return (
        <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            content={deleteView} 
            title="Delete Todo" 
            btnToggle={btnToggle} 
        />
    )
}

export default DeleteTodo