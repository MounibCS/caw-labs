import React, { useState } from 'react';

export default function Exercise4() {
    const [styleConfig, setStyleConfig] = useState({
        width: '',
        height: '',
        backgroundColor: ''
    });
    const [divs, setDivs] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStyleConfig(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!styleConfig.width || !styleConfig.height || !styleConfig.backgroundColor) return;
        setDivs([...divs, styleConfig]);
        setStyleConfig({ width: '', height: '', backgroundColor: '' });
    };

    return (
        <div className="card">
            <h2>Exercise 4: Div Builder</h2>
            <form onSubmit={handleSubmit} className="grid mb-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
                <input name="width" placeholder="Width (e.g. 100px)" value={styleConfig.width} onChange={handleChange} />
                <input name="height" placeholder="Height (e.g. 100px)" value={styleConfig.height} onChange={handleChange} />
                <input name="backgroundColor" placeholder="Color (e.g. #38bdf8)" value={styleConfig.backgroundColor} onChange={handleChange} />
                <button type="submit">Add Div</button>
            </form>

            <div className="flex" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                {divs.map((style, i) => (
                    <div key={i} style={style} />
                ))}
            </div>
        </div>
    );
}
