import React, { useState } from 'react';

export default function Exercise3() {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username) return;
        setUsers([...users, username]);
        setUsername('');
        setPassword('');
    };

    const handleDelete = (index) => {
        setUsers(users.filter((_, i) => i !== index));
    };

    return (
        <div className="card">
            <h2>Exercise 3: User List</h2>
            <form onSubmit={handleSubmit} className="flex-col mb-4">
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit">Add User</button>
                </div>
            </form>

            <ul className="flex-col">
                {users.map((u, i) => (
                    <li key={i} className="flex justify-between bg-white/5 p-2 rounded items-center">
                        <span>{u}</span>
                        <button onClick={() => handleDelete(i)} style={{ background: '#ef4444' }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
