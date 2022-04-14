import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Repositorio from './pages/Repositorio';
import Main from './pages/Main';

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/"  element={<Main />} />
                <Route exact path="/repositorio/:repositorio"  element={<Repositorio />} />
            </Routes>
        </BrowserRouter>
    )
}