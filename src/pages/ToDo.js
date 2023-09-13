import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import { FcTodoList } from 'react-icons/fc'

const ToDo = () => {
    let navigate = useNavigate()

    const [newToDo, setNewToDo] = useState('')
    const [auth, setAuth] = useState('')
    const [toDos, setToDos] = useState([])
    const [updateID, setUpdateID] = useState('')
    const [updateToDo, setUpdateToDo] = useState('')

    useEffect(() => {
        const getAuth = localStorage.getItem('JWT')

        if(getAuth===null) {
            navigate('/signin')
        } else {
            setAuth(getAuth)
            const url = process.env.REACT_APP_API + 'todos'

            const req = {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${getAuth}`
                }
            }

            fetch(url, req)
                .then((response) => response.json()
                .then((json) => {
                    setToDos(json)
                }))
        }
    }, [navigate])

    const update = (e, id, todo, completed) => {
        e.preventDefault()
        const url = process.env.REACT_APP_API + `todos/${id}`

        const data = {
            todo: todo,
            isCompleted: completed
        }

        const req = {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${auth}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(url, req)
            .then((response) => {
                if(response.status===200) {
                    response.json()
                        .then((json) => {
                            const idx = toDos.indexOf(toDos.filter((t)=>t.id===id)[0])
                            setToDos([...toDos.slice(0, idx), json, ...toDos.slice(idx+1)])
                            setUpdateID('')
                        })
                }
            })
    }

    const deleteToDo = (id) => {
        if(window.confirm('정말 삭제하시겠습니까?')) {
            const url = process.env.REACT_APP_API + `todos/${id}`

            const req = {
                method: 'DELETE',
                headers: {
                    'authorization': `Bearer ${auth}`
                }
            }

            fetch(url, req)
                .then((response) => {
                    if(response.status===204) {
                        setToDos([...toDos.filter((t)=>t.id!==id)])
                    } else {
                        alert('삭제에 실패했습니다.')
                    }
                })
        }
    }

    const PrintToDos = () => { 
        if(toDos.length>0) {
            const listItem = toDos.map((todo) => 
                <li key={`li${todo.id}`}>
                    <div>
                        <form onSubmit={(e)=>update(e, todo.id, updateToDo, todo.isCompleted)}>
                            <label>
                                <input id={todo.id} type="checkbox" checked={todo.isCompleted} onChange={(e)=>update(e, todo.id, todo.todo, !todo.isCompleted)}/>
                                <span>
                                    {updateID===todo.id?
                                        <input className="modify-input text-input" data-testid="modify-input" value={updateToDo} onChange={(e)=>setUpdateToDo(e.target.value)} autoFocus={true} required/>:
                                        <span className="todo-text">{todo.todo}</span>
                                    }
                                </span>
                            </label>
                            {updateID===todo.id?
                                <p className="btn-container">    
                                    <button data-testid="submit-button" type="submit">제출</button>
                                    <button data-testid="cancel-button" type="button" onClick={()=>setUpdateID('')}>취소</button>
                                </p>:
                                <p className="btn-container">
                                    <button data-testid="modify-button" type="button" onClick={()=> {setUpdateID(todo.id);setUpdateToDo(todo.todo)}}>수정</button>
                                    <button data-testid="delete-button" type="button" onClick={()=>deleteToDo(todo.id)}>삭제</button>
                                </p>
                            }         
                        </form> 
                    </div>          
                </li>
            )
            return (
                <ul>{listItem}</ul>
            )
        }
        
        return (
            <ul></ul>
        )
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        const url = process.env.REACT_APP_API + 'todos'

        const data = {
            todo: newToDo
        }

        const req = {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${auth}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(url, req)
            .then((response) => {
                if(response.status===201) {
                    response.json()
                    .then((json) => {
                        setToDos([...toDos, json])
                        setNewToDo('')
                    })                    
                } else {
                    alert('문제가 발생했습니다. 다시 시도해주세요.')
                }
            })
    }

    const logout = () => {
        if(window.confirm('정말 로그아웃하시겠습니까?')) {
            localStorage.removeItem('JWT')
            navigate('/signin')
        }
    }

    return (
        <div className="main-container">
            <div className="content-container">
                <div className="sign" onClick={logout}>로그아웃</div>
                <div className="title"><FcTodoList /> ToDo</div>
                <form onSubmit={onSubmit} className="sign-form">
                    <input className="text-input" data-testid="new-todo-input" value={newToDo} onChange={(e)=>{setNewToDo(e.target.value)}} autoFocus={true} required />
                    <button data-testid="new-todo-add-button" type="submit">추가</button>
                </form>
                {toDos.length>0?<PrintToDos />:null}
            </div>
        </div>
    )
}

export default ToDo;