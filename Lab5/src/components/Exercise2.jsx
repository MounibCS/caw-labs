import React, { useState } from 'react';

export const DisplayTab = ({ tab }) => {
    const [items, setItems] = useState(tab);

    const handleRemove = (indexToRem) => {
        setItems(prev => prev.filter((_, i) => i !== indexToRem));
    };

    return (
        <ul className="mb-4">
            {items.map((item, index) => (
                <li
                    key={index}
                    onClick={() => handleRemove(index)}
                    className="p-2 mb-2 bg-white/5 hover:bg-white/10 cursor-pointer rounded transition-colors"
                >
                    Element {index + 1} is: {item}
                </li>
            ))}
        </ul>
    );
};

export default function Exercise2() {
    const tab1 = ["hello", "world", "from", "react"];
    const tab2 = ["apple", "banana", "cherry", "date"];

    return (
        <div className="card">
            <h2>Exercise 2</h2>
            <h3>Table 1 (Click to remove)</h3>
            <DisplayTab tab={tab1} />

            <h3>Table 2 (Click to remove)</h3>
            <DisplayTab tab={tab2} />
        </div>
    );
}
