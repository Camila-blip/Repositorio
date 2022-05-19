import React from "react";
import { useParams } from "react-router-dom";
import './styles.scss';

export default function Repositorio(){
    const { repositorio } = useParams(); 
    return(
        <>
            <h1>
                {repositorio}
            </h1>
        </>
    )
}