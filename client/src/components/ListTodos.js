import React, { useEffect, useState } from 'react';
import EditTodo from "./EditTodo";

const ListTodos = () => {
    const [todos, setTodos] = useState([])
    const getTodos = async () => {
        try {
            const response = await fetch("/todos")
            const jsonData = await response.json()
            setTodos(jsonData)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

    const deleteTodo = async (id) => {
        try {
            await fetch(`/todos/${id}`, {
                method: 'DELETE'
            });
            setTodos(todos.filter(todo => todo.todo_id !== id))

        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            <table className="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {todos.map((todo, index) => (
                    <tr key={index}>
                        <td>{todo.description}</td>
                        <td>
                            <EditTodo todo={todo}/>
                        </td>
                        <td>
                            <button
                                className="btn-danger btn"
                                onClick={() => deleteTodo(todo.todo_id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))

                }
                </tbody>
            </table>
        </>
    );
};

export default ListTodos;
