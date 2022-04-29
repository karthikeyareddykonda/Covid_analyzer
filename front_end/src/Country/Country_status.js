import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { default as ReactSelect } from "react-select";
import {Button} from 'react-bootstrap';
import { components } from "react-select";
import {Bar} from "react-chartjs-2"
import {
    BrowserRouter as Router ,
    Routes,
    Route,
    Link,
    useParams
  
  } from 'react-router-dom' ;


  const country_options = [
    { value: "India", label: "India" },
    { value: "China", label: "China" },
    { value: "Russia", label: "Russia" },
    { value: "Australia", label: "Australia"},
    { value: "Canada", label: "Canada"},
    { value: "United States", label : "USA"}
  ];


  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

class Country_status extends React.Component{

    constructor(props){

        super(props); 

        this.state = {
            name : "India",
            country: "India" ,
            req1 : false ,
            data : []
        }

        this.handleChange = this.handleChange.bind(this) ;
        this.get_data = this.get_data.bind(this) ;
        this.display_data = this.display_data.bind(this) ;
        console.log("This is country status constructor") ;

    }

    componentDidMount(){

        // do nothing as of now 

    }

    handleChange = selected => {
        this.setState({
          country : selected
        });

       

        

      };


    get_data(){

        this.setState({
            req1 : false 
        })
        var loc_c = "India" ;
        if(typeof(this.state.country.value) !== 'undefined'){

            loc_c = this.state.country.value ;
          }
        var url = 'http://10.42.0.51:8000/summary/'+ loc_c ;
        console.log("req url",url) ;

        fetch(url)
        .then((Response) => Response.json())
        .then((json) => {

            const tp  = JSON.parse(json);

            console.log(tp) ;

            this.setState({
                req1 : true ,
                data : tp

            })
           
            
            
            
        })


    }

    display_data(){

        if(!this.state.req1) return (<><p> Select the country</p></>)


        const mydata = {
            labels: ['Ventilators','oxygen cylinder'],
            datasets: [
              {
                label: 'Demand',
                backgroundColor: 'rgba(75,192,192,0.5)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [this.state.data.Ventilators[0],this.state.data['oxygen cylinder'][0]]
              } ,
              {
                
                label : 'Supply',
                backgroundColor: 'rgba(0,0,0,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [this.state.data.Ventilators[1],this.state.data['oxygen cylinder'][1]]
              

              }
            ]
          }

        return(
            <>
            
            <ul>
                <li> Total cases :  {this.state.data.total_cases}</li>
                <li> Total Deaths : {this.state.data.total_deaths} </li>
                


            </ul>

            <div style={{height: "300px", width :"80%"}}>
              <Bar
                data={mydata}
                options={{
                  title:{
                    display:true,
                    text:'Demand SUpply',
                    fontSize:20
                  },
                  legend:{
                    display:true,
                    position:'right'
                  },
                  displayPosition : true,
                  
                 
                  maintainAspectRatio : false 
                }}
              />
            </div>
            
            
            
            
            </>
        


        )

    }

    render(){


        return(

            <>
            
            
            
                <h1> Country page </h1>

                <Button onClick={this.get_data}> Get Data</Button>
                <br></br>
                <span
        className="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please selecet account(s)"
      >
        
        <ReactSelect
                options={country_options}
              
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                    Option
                }}
                onChange={this.handleChange}
                allowSelectAll={true}
                value={this.state.country}
             />


      </span>


                

                {<this.display_data  />}
            
            
            
            </>





        )
    }

}



export default (props) => (
    <Country_status
        {...props}
        params={useParams()}
    />
);