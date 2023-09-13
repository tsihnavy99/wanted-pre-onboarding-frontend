import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import '../App.css';

const SignUp = () => {
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
        const url = process.env.REACT_APP_API + 'auth/signup'

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
                if(response.status===201) {
                    alert('회원가입이 완료되었습니다. 가입한 정보로 로그인해주세요.')
                    navigate('/signin')
                } else{
                    response.json()
                    .then((json) => {
                        alert(json.message)
                    })
                }
            })
    }

    return (
        <div className="main-container">
            <div className="content-container">
                <span className="title">회원가입</span>
                <form onSubmit={onSubmit} className="sign-form">
                    <span className="input-label">E-mail</span><br/>
                    <input className="text-input" data-testid="email-input" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="@ 포함" /><br/>
                    <span className="input-label">Password</span><br/>
                    <input className="text-input" data-testid="password-input" value={pw} onChange={(e)=>{setPw(e.target.value)}} placeholder="8자리 이상" /><br/>
                    <button className="sign-button" data-testid="signup-button" disabled={disabled}>회원가입</button>
                </form>
                <div className="sign" onClick={()=>navigate('/signin')}>로그인</div>
            </div>
        </div>
    )
}

export default SignUp