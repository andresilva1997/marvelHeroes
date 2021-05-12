import React,{useState,useEffect} from 'react';
import {Card, Accordion} from "react-bootstrap";
import Detail from './detail';

const url = "http://gateway.marvel.com/v1/public/characters?limit=10&ts=22&apikey=04d8eafbba65210017844f6aaa320809&hash=0eff5ed830776f15ead539c7fe0651e7";

const Characters = () => {
    const [ state, setstate] = useState({characters:[]});
    useEffect(() => {
        fetch(url)
        .then(x => x.json())
        .then(y => {
            if(!navigator.onLine){
                let i=localStorage.getItem("characters");
                if(i !== null)
                {
                    setstate({characters:i});
                }
            }else{
                localStorage.setItem("characters",JSON.stringify(y.data.results));
                setstate({characters:y.data.results});
            }
            })
        .catch(e => console.log(e));
    },[]);


    const produce = () =>{
        if(state.characters.length===0){
            return(<h2>The heroes are busy saving the world</h2>);
        }else{
            return(
                <div>
                {state.characters.map(c=>(
                    <Card className="bg-dark text-white" style={{ width: '18rem' }}>
                        
                        
                        <Card.Img src={c.thumbnail.path+"."+c.thumbnail.extension} alt="Card image" />
                            <Detail info={c} key={c.id}/>
                        
                            </Card>                    
                ))}
            </div>
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