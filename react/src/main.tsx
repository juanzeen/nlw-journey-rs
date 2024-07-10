//arquivo base da aplicação
//faz a integração com o DOM aquim por meio do REACTDOM
//React é o core do React, ReactDOM específico para web
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'
import './index.css'

//pega o elemento root do index.html e usa um render, que serve para mostrar em tela
//aqui é o lugar onde fica nosso App, que é outro componente onde ficará nossa base da aplicação
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
