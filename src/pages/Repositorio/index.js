import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {Container, Owner, Loading, BackButton, IssuesList, PageActions, ListButton} from './styles';
import api from '../../services/api';
import {FaArrowLeft} from 'react-icons/fa';


export default function Repositorio(){
    const { repositorio } = useParams(); 
    const [repositorioNome, setRepositorioNome] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState([
        {state: 'all', label: 'Todas', active: true},
        {state: 'open', label: 'Abertas', active: false},
        {state: 'closed', label: 'Fechadas', active: false}
    ]);
    const [stateIndex, setStateIndex] = useState(0);
    
    useEffect(()=>{
        async function load(){
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${repositorio}`),
                api.get(`/repos/${repositorio}/issues`,{
                    params:{
                        state: filter[stateIndex].state,
                        per_page: 5
                    }
                })
            ]);
            setRepositorioNome(repositorioData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }

        load();
    },[repositorio,filter,stateIndex]);

    useEffect(()=>{
        async function loadIssue(){
            const response = await api.get(`/repos/${repositorio}/issues`,{
                params:{
                    state: filter[stateIndex].state,
                    page,
                    per_page: 5
                }
            });
            setIssues(response.data);
        }

        loadIssue();

    },[page,filter,stateIndex]);

    function handlePage(action){
        setPage(action === 'back' ? page - 1 : page + 1)   
    }

    function handleFilter(index){
        setStateIndex(index);
    }

    if(loading){
        return(
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }
    
        return(
            <Container>
                <BackButton to="/">
                    <FaArrowLeft color="#000" size={35}/>
                </BackButton>

                <Owner>
                    <img src={repositorioNome.owner.avatar_url} alt={repositorioNome.owner.login} />
                    <h1>{repositorioNome.name}</h1>
                    <p>{repositorioNome.description}</p>
                </Owner>
                <ListButton active={stateIndex}>
                    {filter.map((filter,index)=>(
                         <button key={filter.label}  
                         type="button" 
                         onClick={()=> handleFilter(index)}
                         >
                             {filter.label}
                        </button>
                    ))}
                </ListButton>
                <IssuesList>
                    {issues.map(issue =>(
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login} />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label =>(
                                        <span key={String(label.id)}>{label.name}</span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                    
                </IssuesList>
                <PageActions>
                    <button 
                    type="button" 
                    onClick={() => handlePage('back')}
                    disabled={page < 2}
                    >
                        Voltar
                    </button>
                    <button type="button" onClick={() => handlePage('next')}>Próxima</button>
                </PageActions>
            </Container>
        )
    
}