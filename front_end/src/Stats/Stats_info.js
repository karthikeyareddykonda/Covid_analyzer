import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import makeAnimated from "react-select/animated";
import { default as ReactSelect } from "react-select";
import { DateRangePicker } from 'react-date-range';
import { components } from "react-select";
import {Button} from 'react-bootstrap';
import {
    BrowserRouter as Router ,
    Routes,
    Route,
    Link,
    useParams
  
  } from 'react-router-dom' ;

  import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from "react-chartjs-2";

import Country_info from "../Country/Country_info";


  const colourOptions = [
    { value: "India", label: "India" },
    { value: "China", label: "China" },
    { value: "Russia", label: "Russia" },
    { value: "Australia", label: "Australia"},
    { value: "Canada", label: "Canada"},
    { value: "United States", label : "USA"}
  ];

  const statOptions = [
    { value : "new_deaths" , label : "Deaths" },
    { value : "new_cases", label : "New cases"},
    { value : "new_tests", label : "New_tests"},
    { value : "hosp_patients", label : "Hospitalized"}
    

    

  ]

  const varOptions = [
    { value : "alpha", label : "alpha"},
    { value : "beta" , label : "Beta"},
    { value : "delta" , label : "delta"},
    { value : "omicron" , label : "Omicron"},
    { value : "all" , label :"All" }

  ]

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

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const totalDuration = 1000;
  const delayBetweenPoints = totalDuration / 5;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
  const animation = {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    }
  };

class Stats_info extends React.Component{

    constructor(props){

        super(props); 

        this.state = {
            name : "India",
            Country_Selected: [],
            Stat_options : [],
            varoptions : [],
            all_req : false,
            date_range : [],
            sample_data : [] ,
            graph_data : null ,
            scount : 0 ,
            startDate : [],
            endDate :[] 

        }
        

        
       
        

        this.get_data = this.get_data.bind(this) ;
        this.handleChange = this.handleChange.bind(this) ;
        this.handleChange2 = this.handleChange2.bind(this) ;
        this.handleSelect = this.handleSelect.bind(this) ;

        this.display_graph = this.display_graph.bind(this) ;
        this.handleChange3 = this.handleChange3.bind(this) ;

    }

    handleChange = selected => {
        this.setState({
          Country_Selected: selected
        });

       

        

      };

    handleChange2 = selected => {

  
      this.setState({

        Stat_options : selected


      }) ;
     
      
    }

    handleChange3 = selected => {

      this.setState({
        varoptions : selected 

      }) ;
    }
    

    handleSelect(date){
     
      if(this.state.scount == 0){

        this.setState({
          startDate : date ,
          scount : 1 
        })


      }
      else{
        this.setState({
          endDate : date,
          scount : 0  

        })

      }
      

     
    
    
  }


    get_data(){

      this.setState({
        all_req : false 
      })

      
      
     
      
      const mygraph_data = {
        labels: [],
        datasets: []
      };
   

      let p = Object.values(this.state.startDate)[0];
      
        let p2 = JSON.stringify(p.startDate);

         p = Object.values(this.state.endDate)[0];
        let p3 = JSON.stringify(p.startDate);
        var c1 = "Russia" , c2 = "India" ;

        const countries = this.state.Country_Selected ;
        var url = 'http://10.42.0.51:8000/country/' ;

        for(var i =0 ;i <countries.length;i++){
          url = url +  countries[i].value + ','
        }
        var variant = "alpha" , stats = "new_cases" ; 
      
       
        if(typeof(this.state.varoptions.value) !== 'undefined'){
          variant = this.state.varoptions.value ;
        }
    
        
        if(typeof(this.state.Stat_options.value) !== 'undefined'){

          stats = this.state.Stat_options.value ;
        }


        url = url + '/type/'+ stats + '/variant/' + variant +'/start/'+p2+ '/end/' + p3 ;
        
       
//        var url = 'http://10.42.0.51:8000/country/' + c1 + ',' +c2 + '/type/new_cases/variant/alpha/start/'+p2+ '/end/' + p3 ;
       // url = url.concat([c1,c2,'/type/new_cases/variant/alpha/start/',p2,'/end/',p3]);
       var  cols = ["red","green","blue","violet","indigo","yellow","orange"];
       
        fetch(url)
        .then((Response) => Response.json())
        .then((json) => {

            const tp  = JSON.parse(json);
           
            
            const n_c = Object.keys(tp).length ;
            var mylabels = [];
            
            for(var i =0;i<tp[countries[0].value].length;i++) mylabels[i] = "";

               mygraph_data.labels = mylabels;
               
            for(var i =0;i<n_c;i++){

              
              

            
              mygraph_data.datasets[i] = {
                label : countries[i].value ,
                data : tp[countries[i].value]  ,
                backgroundColor: "rgba(" + i+",192,192,0.2)",
                borderColor: cols[i%7]
              }

            }

            this.setState({
              graph_data : mygraph_data,
              all_req : true 
            })
            
        })
        

      

      




    }

    display_graph(){

      var tp = false;

      if( !this.state.all_req)  return(<>Waiting for data</>);
      
      

      
      
      
      return(

        <>
        

          <p>Got all the data to display graph  and {this.state.graph_data.datasets.length} </p>

          
          <Line 
          
            data = {this.state.graph_data}

            options = {{
        
              animations: animation
              
              
            }}
          />
          
        
        </>

      )

    }

    componentDidMount(){

        // do nothing as of now 

    }

    render(){
      const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }

        return(

            <>
            
              {< this.display_graph />} 
            
                <h1> Stats page </h1>


                <Button onClick={this.get_data} > Get the data</Button>
                <p>Select Countries</p>
                <span
        className="d-inline-block"
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

          <br></br>
          <p>Select Statistic</p>
      <span
        className="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please selecet account(s)"
      >
        <ReactSelect
          options={statOptions}
         
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={this.handleChange2}
          allowSelectAll={true}
          value={this.state.Stat_options}
        />
      </span>

      <br></br>
          <p>Select Variant</p>
      <span
        className="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please selecet account(s)"
      >
        <ReactSelect
          options={varOptions}
         
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={this.handleChange3}
        
          value={this.state.varoptions}
        />
      </span>

      <p> Select the date range </p>
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={this.handleSelect}
      />
            
            
            
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