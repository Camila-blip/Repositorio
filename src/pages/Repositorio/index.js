import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {Container, Owner, Loading, BackButton} from './styles';
import api from '../../services/api';
import {FaArrowLeft} from 'react-icons/fa';


export default function Repositorio(){
    const { repositorio } = useParams(); 
    const [repositorioNome, setRepositorioNome] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        async function load(){
            alert(repositorio)
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${repositorio}`),
                api.get(`/repos/${repositorio}/issues`,{
                    params:{
                        state: 'open',
                        per_page: 5
                    }
                })
            ]);
            console.log(repositorioData.data)
            setRepositorioNome(repositorioData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }

        load();
    },[repositorio]);

    if(loading){
        return(
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }
    
        return(
            <Container>
                <BackButton>

                </BackButton>

                <Owner>
                    <img src={repositorioNome.owner.avatar_url} alt={repositorioNome.owner.login} />
                    <h1>{repositorioNome.name}</h1>
                    <p>{repositorioNome.description}</p>
                </Owner>
            </Container>
        )
    
}