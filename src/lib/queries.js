import { gql } from "@apollo/client"

export const GET_TODOS = gql `
    query GetTodos {
        listTodos {
            id
            content
            status
        }
    }
`;

export const ADD_TODO = gql `
    mutation AddTodo($content: String!, $status: TodoStatus) {
        addTodo (content: $content, status: $status) {
            id
            content
            status
        }
    }
`;

export const EDIT_TODO = gql `
    mutation EditTodo($id: ID!, $content: String!, $status: TodoStatus) {
        editTodo (id: $id, content: $content, status: $status) {
            id
            content
            status
        }
    }
`;

export const DELETE_TODO = gql `
    mutation EditTodo($id: ID!) {
        deleteTodo (id: $id) {
            ok
        }
    }
`;