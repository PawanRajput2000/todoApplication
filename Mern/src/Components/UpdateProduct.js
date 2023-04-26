import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const UpdateProduct = () => {
    const [list, setList] = React.useState("")
    const [title, setTitle] = React.useState("");
    const [description, setdescription] = React.useState("");
    const [status, setstatus] = React.useState("");
    const [due_date, setdue_date] = React.useState("");
    const [error, setError] = React.useState(false);
    const params = useParams();
    const navigate = useNavigate();



    useEffect(() => {

        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        console.warn(params);
        let result = await fetch(`http://localhost:5000/update/${params.id}`, {
            headers: {
                "authorization": JSON.parse(localStorage.getItem("token")),
            }
        });
        result = await result.json();
        setList(result)
    }

    const updatetodo = async () => {
        console.warn(title, description, status, due_date)

        let result = await fetch(`http://localhost:5000/update/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ title, description, status, due_date }),
            headers: {
                "Content-Type": "application/json",
                "authorization": JSON.parse(localStorage.getItem("token")),

            }
        })
        result = await result.json();
        console.warn(result)
        navigate('/')
    }
    console.warn(list)
    return (
        <div className='product'>
            <h1>Add TODO</h1>
            <div className='inpu'>

                <input type="text" placeholder='Enter TODO title' className='inputBox' value={list.title} onChange={(e) => { setTitle(e.target.value) }} />
                {error && !title && <span className='invaild-input'>Enter valid title</span>}

                <input type="text" placeholder='Enter TODO description' className='inputBox' value={list.description} onChange={(e) => { setdescription(e.target.value) }} />
                {error && !description && <span className='invaild-input'>Enter valid description</span>}

                {/* <input type="text" placeholder='Enter TODO status'  className='inputBox'  value={status} onChange={(e)=>{setstatus(e.target.value)}} />
        {error && !status && <span className='invaild-input'>Enter valid status</span>} */}


                <select className='inputBox' name="status" onChange={(e) => { setstatus(e.target.value) }}>
                    <option value={list.status}>Enter TODO status</option>
                    <option value="Pending">Pending</option>
                    <option value="Complete">Complete</option>
                    <option value="Not Started">Not Started</option>
                </select>

                <input type="date" placeholder='Enter TODO due_date' className='inputBox' value={list.due_date} onChange={(e) => { setdue_date(e.target.value) }} />
                {error && !due_date && <span className='invaild-input'>Enter valid due_date</span>}

            </div>

            <button onClick={updatetodo} className='appButton '>Add TODO</button>

        </div>
    );
};

//     return(
//         <div className='product'>
//             <h1>Update Product</h1>
//             <div className="inpu">
//             <input type="text" placeholder='Enter product name' className='inputBox' value={name} onChange={(e)=>{setName(e.target.value)}} />
//            <input type="text" placeholder='Enter product price'  className='inputBox'  value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
//             <input type="text" placeholder='Enter product category'  className='inputBox'  value={category} onChange={(e)=>{setCategory(e.target.value)}} />
//             <input type="text" placeholder='Enter product company'  className='inputBox'   value={company}onChange={(e)=>{setCompany(e.target.value)}} />

//             </div>

//             <button onClick={updateProduct} className='appButton '>Update Product</button>

//         </div>
//     )
// }

export default UpdateProduct;