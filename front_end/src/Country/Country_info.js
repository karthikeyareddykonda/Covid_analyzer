import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Country_status from "./Country_status"; 
import {
    BrowserRouter as Router ,
    Routes,
    Route,
    Link,
    useParams
  
  } from 'react-router-dom' ;


class Country_info extends React.Component{

    constructor(props){

        super(props); 

        this.state = {
            name : "India"
        }

        console.log("This is country constructor") ;

    }

    componentDidMount(){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React POST Request Example' })
        };

        /*
        fetch(`http://localhost:8000/wel/`)
        .then((Response) => Response.json())
        .then((json) => {

            
           
            console.log('fetch 1 called');
            //console.log("scorecard print",json[0])
        })
        */

        
        fetch('http://localhost:8000/abcd/5')
        .then((Response) => Response.json())
        .then((json) => {

            
           
            console.log('fetch 2 called');
            //console.log("scorecard print",json[0])
        })
        // do nothing as of now 

    }

    render(){


        return(

            <>
            
            
            
                <h1> Country page </h1>
            


               


                <ul>

                    <li>

                    <Link to = "/Country/status"  > Country </Link>
                    </li>

                    

                    


                    

                    
                </ul>
                
            
            </>





        )
    }

}



export default (props) => (
    <Country_info
        {...props}
        params={useParams()}
    />
);