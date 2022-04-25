import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import makeAnimated from "react-select/animated";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import {
    BrowserRouter as Router ,
    Routes,
    Route,
    Link,
    useParams
  
  } from 'react-router-dom' ;

  const colourOptions = [
    { value: 1, label: "Country 1" },
    { value: 2, label: "Country 2" },
    { value: 3, label: "Country 3" },
    { value: 4, label: "Country 4" },
    { value: 5, label: "Country 5" }
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


class Stats_info extends React.Component{

    constructor(props){

        super(props); 

        this.state = {
            name : "India",
            optionSelected: null
        }

        console.log("This is stats constructor") ;

    }

    handleChange = selected => {
        this.setState({
          optionSelected: selected
        });

        console.log(this.state.optionSelected) ;
        console.log(selected) ;
      };

    componentDidMount(){

        // do nothing as of now 

    }

    render(){


        return(

            <>
            
            
            
                <h1> Stats page </h1>

                <span
        class="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please selecet account(s)"
      >
        <ReactSelect
          options={colourOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={this.handleChange}
          allowSelectAll={true}
          value={this.state.optionSelected}
        />
      </span>
            
            
            
            </>





        )
    }

}



export default (props) => (
    <Stats_info
        {...props}
        params={useParams()}
    />
);