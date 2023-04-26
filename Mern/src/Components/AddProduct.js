import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate
    const [title, setTitle] = React.useState("");
    const [description, setdescription] = React.useState("");
    const [status, setstatus] = React.useState("");
    const [due_date, setdue_date] = React.useState("");
    const [error, setError] = React.useState(false);

    const addTODO = async () => {
        if (!title || !description || !status || !due_date) {
            setError(true)
            return false;
        }

        console.warn(title, description, status, due_date);
        const userId = JSON.parse(localStorage.getItem('user'))
        console.warn(userId)
        let result = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({ title, description, status, due_date, userId }),
            headers: {
                "Content-Type": "application/json",
                "authorization": JSON.parse(localStorage.getItem("token"))
            }
        })
        result = await result.json();
        
        
        setTitle("")
        setdescription("")
        setstatus("")
        setdue_date("")
        navigate("/")
    }

    return (
        <div className='product'>
            <h1>Add TODO</h1>
            <div className='inpu'>
                <input type="text" placeholder='Enter TODO title' className='inputBox' value={title} onChange={(e) => { setTitle(e.target.value) }} autoComplete='true'/>
                {error && !title && <span className='invaild-input'>Enter valid title</span>}

                <input type="text" placeholder='Enter TODO description' className='inputBox' value={description} onChange={(e) => { setdescription(e.target.value) }} autoComplete='true'/>
                {error && !description && <span className='invaild-input'>Enter valid description</span>}

                {/* <input type="text" placeholder='Enter TODO status'  className='inputBox'  value={status} onChange={(e)=>{setstatus(e.target.value)}} autoComplete='true'/>
            {error && !status && <span className='invaild-input'>Enter valid status</span>} */}

                
                <select className='inputBox' name="status" onChange={(e) => { setstatus(e.target.value) }}>
                <option value="Not Started">Enter TODO status</option>
                    <option value="Pending">Pending</option>
                    <option value="Complete">Complete</option>
                    <option value="Not Started">Not Started</option>
                </select>

                <input type="date" placeholder='Enter TODO due_date' className='inputBox' value={due_date} onChange={(e) => { setdue_date(e.target.value) }} autoComplete='true'/>
                {error && !due_date && <span className='invaild-input'>Enter valid due_date</span>}
            </div>

            <button onClick={addTODO} className='appButton '>Add TODO</button>

        </div>
    )
}

export default AddProduct;