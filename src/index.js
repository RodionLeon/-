import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// const express=require('express')();
// const app=express();
// const PORT=8080;

// app.use(express.json())

// app.get('/tshirt', (req, res) => {
//   res.status(200).send({
//     tshirt:'TSHIRT',
//     size:'large'
//   })
// })

// app.post('/tshirt/:id', (req, res)=>{
//   const {id}=req.params;
//   const {logo}=req.body;
//   if (!logo){
//     res.status(418).send({message: 'We need a logo'})
//   }
//   res.send({
//     tshirt:`TSHIRT with your ${logo} and ID of ${id}`,
//   })
// })
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


