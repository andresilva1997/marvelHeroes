import React,{useState,useEffect} from 'react';
import {Card, Accordion} from "react-bootstrap";
import Detail from './detail';

const url = "http://gateway.marvel.com/v1/public/characters?limit=50&ts=22&apikey=04d8eafbba65210017844f6aaa320809&hash=0eff5ed830776f15ead539c7fe0651e7";

const Characters = () => {
    const [ state, setState] = useState({characters:[]});
    useEffect(() => {
        fetch(url)
        .then(x => x.json())
        .then(y => {
            if(!navigator.online){
                let i=localStorage.getItem("characters");
                if(i !== null)
                {
                    setState({characters:i});
                }
            }else{
                localStorage.setItem("characters",JSON.stringify(y.data.results));
                setState({characters:y.data.results});
            }
            })
        .catch(e => console.log(e));
    },[]);


    const produce = () =>{
        if(state.characters.length===0){
            return(<h2>The heroes are busy saving the world</h2>);
        }else{
            return(
                <Accordion>
                    {state.characters.map(c=>(
                        <Card>
                            <Card.Img src={c.thumnail.path+'.'+c.thumnail.extension} alt="Card image" />
                            <Card.Header>
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey={c.id}>
                                    {c.name}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={c.id}>
                                <Character info={c} key={c.id}/>
                            </Accordion.Collapse>
                        </Card>                    
                    ))}
                </Accordion>
            );
        }
    }

    return(
        <div>
           <h2>Characters</h2>
           {produce()} 
        </div>);

};

export default Characters;