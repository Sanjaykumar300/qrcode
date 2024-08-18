import React, { useState } from 'react';

const Some = () => {
    const [count, setCount] = useState(0);
    const [name,setName]=useState("");
    const[age,setAge]=useState();

    function decrement() {
        setCount(count - 2);
    }

    function increment() {
        setCount(count + 2);
    }

    return (
        <div>
            <button onClick={decrement}>-</button>
            <span>{count}</span>
            <button onClick={increment}>+</button>
            <input type="text" value={name} placeholder='Enter a name...' onChange={(e)=>setName(e.target.value)}/>
            <input type="text" value={age} placeholder='Enter an age...' onChange={(e)=>setAge(e.target.value)} />
            <p>My name is {name} and age is {age} years old</p>
        </div>
    );
}

export default Some;
