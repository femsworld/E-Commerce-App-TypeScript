import React, { useState } from 'react'

const SignUp = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!username || !email) {
            setError("username and email cannot be empty")
        }else if (username.length < 8) {
            setError("username must be at least 8 characters")
        }
       // setError("username and email cannot be empty")
    }
    return (
        <div data-testid="signup">
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" name="username" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <input type="email" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="file" name="" id="" />
                <button>Send</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

export default SignUp