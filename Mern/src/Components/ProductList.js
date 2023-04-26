import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        "authorization": JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    setProducts(result);
  };

  

  const deleteProduct = async (id) => {
    console.warn("delete")
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "delete",
      headers:{
        "authorization": JSON.parse(localStorage.getItem("token")),
      }
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

   return (
    <div className="product-list">

      <h3>TODO List</h3>
     
      <div className="tbl">
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>S.No</th>
              <th>Title</th>
              <th>Description</th>
              <th>status</th>
              <th>Due Date</th>
              <th>Operation</th>
            </tr>
          </thead>

          {products.length > 0 ? (
            products.map((item, index) => (
              <tbody>
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                  <td>{item.due_date}</td>
                  
                  {/* <li>{item.company}</li> */}
                  <td>
                    <div className="btns">
                      <div className="btns1">
                        <Button
                          variant="danger"
                          onClick={() => deleteProduct(item._id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <div className="btns1">
                        {/* <Button variant="primary"> */}
                        <Link to={"/update/" + item._id}><Button variant="primary">Update</Button></Link>
                        {/* </Button> */}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <h1>No Result Found</h1>
          )}
        </Table>
      </div>
    </div>
  );
};

export default ProductList;
