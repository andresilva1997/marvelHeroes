import React,{useState} from 'react';
import {Card,Row,Col} from 'react-bootstrap';

const Detail = (x) => {

    const [state, setState] = useState({info:x.info});

    const product = () => {
        if(state.info.description===""){
            return(
                <p>Your hero doesnt exist!</p>
                );    
                
        }else{
            return(
                <p>{state.info.description}</p>
                );    
        }
    };
    return(
        
        <Card.ImgOverlay>
        <Card.Title><h2>{state.info.name}</h2></Card.Title>
        <Card.Text>
        <h5>About</h5>{product()}
        </Card.Text>
        <Card.Text>ID:{state.info.id}</Card.Text>
      </Card.ImgOverlay>
        
        
    )};

export default Detail