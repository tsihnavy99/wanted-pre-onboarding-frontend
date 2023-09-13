import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import '../App.css'

const SignIn = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if(localStorage.getItem('JWT')!==null) {
            navigate('/todo')
        }
    }, [navigate])

    useEffect(() => {
        const reg = /@+/g
        
        if(reg.test(email)&&pw.length>=8) setDisabled(false)
        else setDisabled(true)
    }, [email, pw])

    const onSubmit = (e) => {
        e.preventDefault()
        const url = process.env.REACT_APP_API + 'auth/signin'

        const data = {
            email: email,
            password: pw
        }

        const req = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        
        fetch(url, req)
            .then((response) => {
                if(response.status===200) {
                    response.json().then((json) => {
                        localStorage.setItem('JWT', json.access_token)
                        navigate('/todo')
                    })
                } else {
                    alert('로그인에 실패했습니다.')
                }          
            })
    }

    return (
        <div className="main-container">
            <div className="content-container">
                <span className="title">로그인</span>
                <form onSubmit={onSubmit} className="sign-form">
                    <span className="input-label">E-mail</span><br/>
                    <input className="text-input" data-testid="email-input" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="@ 포함" /><br/>
                    <span className="input-label">Password</span><br/>
                    <input className="text-input" data-testid="password-input" value={pw} onChange={(e)=>{setPw(e.target.value)}} placeholder="8자리 이상" /><br/>
                    <button className="sign-button" data-testid="signin-button" disabled={disabled}>로그인</button>
                </form>
                <div className="sign" onClick={()=>navigate('/signup')}>회원가입</div>
            </div>
        </div>
    )
}

export default SignIn