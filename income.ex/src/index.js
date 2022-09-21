import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes , Route} from "react-router-dom";
import Login from "./Login";
import Daily from "./Daily";
import Register from "./Register";
import Income from "./Income";
import Expense from "./Expense";
import All_Income from "./All_Income";
ReactDOM.render(
  <BrowserRouter>
  <Routes>
     <Route path="/" element={<Login />}/>
     <Route path="/login" element={<Login />}/>
     <Route path="/daily" element={<Daily />}/>
     <Route path="/register" element={<Register />}/>
     <Route path="/income" element={<Income />}/>
     <Route path="/expense" element={<Expense />}/>
     <Route path="/all_income" element={<All_Income />}/>
  </Routes>

  </BrowserRouter>,
  document.getElementById("root")
);
