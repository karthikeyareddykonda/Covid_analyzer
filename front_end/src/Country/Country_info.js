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

        

        var c1 = "Russia" , c2 = "India" ;
        

        fetch(`http://10.42.0.51:8000/country/${c1},${c2}/type/new_cases/variant/alpha/start/0/end/999`)
        .then((Response) => Response.json())
        .then((json) => {

            let tp  = JSON.parse(json);
           
            console.log(tp);
            
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