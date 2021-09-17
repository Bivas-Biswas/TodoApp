import React, { useState } from 'react';

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description)

    // edit description function
    const updateDescription = async (e) => {
        e.preventDefault()
        try {
            const body = { description }
            /**
             * proxy is only use in development so it will be ignored in producton
             * so if there is no http://localhost:5000 then by default it is going to use heroku domain
             * remember this heroku app is just our server serving the build static content and also
             * holding the restful api
             * 
             * https://pern-todo-app.herokuapp.com/todos
             */

            await fetch(`/todos/${todo.todo_id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = '/'
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <>
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
                Edit
            </button>

            <div
                id={`id${todo.todo_id}`}
                className="modal fade"
                role="dialog"
                onClick={() => setDescription(todo.description)}
            >
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className={'form-control'} value={description}
                                   onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-dismiss="modal"
                                onClick={updateDescription}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                            >
                                Close
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default EditTodo;
