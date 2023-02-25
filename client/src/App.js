import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [food, setFood] = useState("");
  const [days, setDays] = useState("");
  const [newFoodName,setNewFoodName] = useState("")
  const [foodList, setFoodList] = useState([]);

  const foodHandler = (e) => {
    setFood(e.target.value);
  };

  const daysHandler = (e) => {
    setDays(e.target.value);
  };

  const updateName = (e) =>{
    setNewFoodName(e.target.value)
  }

  const updateHandler = (id) =>{
    Axios.put("http://localhost:3001/update", { newFoodName: newFoodName, id: id });
  
  }

  const submitHandler = (e) => {
    Axios.post("http://localhost:3001/insert", { foodName: food, days: days });
  };

  const deleteHandler = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };


  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  }, [foodList]);

  return (
    <div className="container">
      <h1 className="text-center">CRUD Application</h1>
      <div className="d-flex flex-column align-items-center">
        <label>Food Item</label>
        <input type="text" className="mb-3 w-50" onChange={foodHandler} />
        <label>Days Since Ate</label>
        <input type="number" className="mb-3 w-50" onChange={daysHandler} />
        <button className="mt-3 btn btn-primary" onClick={submitHandler}>
          Add
        </button>
      </div>
      <h1 className="text-center mt-5">Food List</h1>
      {foodList.map((food) => {
        return <div className="m-3 text-center border border-dark w-100 h-100 ">
          <h3 >{food.foodName} </h3>
          <h4>{food.daysSinceIAte}</h4>
          <input type="text" placeholder="New food name..." className="m-2" onChange={updateName}/>
          <button className="mb-3" onClick = {()=>updateHandler(food._id)}>Update</button><br/>
          <button className="mb-3" onClick = {() =>deleteHandler(food._id)}>Delete</button>
        </div>;
      })}
    </div>
  );
}

export default App;
