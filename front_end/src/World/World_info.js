import React from "react";
import WorldMap from "react-svg-worldmap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import { Pie} from "react-chartjs-2"
import {
    BrowserRouter as Router ,
    Routes,
    Route,
    Link,
    useParams
  
  } from 'react-router-dom' ;
  import {Button} from 'react-bootstrap';

  const statOptions = [
    { value : 1 , label : "Deaths" },
    { value : 2, label : "Active cases"}
    

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

  const { getCode, getName } = require('country-list');

class World_info extends React.Component{

    constructor(props){

        super(props); 

        this.state = {
            name : "India",
            Stat_options : null,
            date : [],
            map_data : [],
            summary_data : [],
            req1 : false,
            req0 : false
        }

        

        console.log("This is world constructor") ;

 
console.log(getName('IS')); // Iceland
console.log(getCode('Iceland'));

        this.data = [
            { country: "CN", value: 1389618778 }, // china
            { country: "in", value: 1311559204 }, // india
            { country: "us", value: 331883986 }, // united states
            { country: "id", value: 264935824 }, // indonesia
            { country: "pk", value: 210797836 }, // pakistan
            { country: "br", value: 210301591 }, // brazil
            { country: "ng", value: 208679114 }, // nigeria
            { country: "bd", value: 161062905 }, // bangladesh
            { country: "ru", value: 141944641 }, // russia
            { country: "mx", value: 127318112 }, // mexico
          ];

        this.setcolor = this.setcolor.bind(this) ;
        this.get_data = this.get_data.bind(this);
        this.handleSelect = this.handleSelect.bind(this) ;
        this.display_map = this.display_map.bind(this) ;
        this.display_all_summ = this.display_all_summ.bind(this) ;

    }
    handleChange2 = selected => {
        this.setState({
  
          Stat_options : selected
  
  
        })
     
      }

    componentDidMount(){

        // do nothing as of now 


        fetch('http://10.42.0.51:8000/world/variant_mix')
        .then((Response) => Response.json())
        .then((json) => {

          const tp  = JSON.parse(json);
            console.log(tp) ;

            this.setState({

              req0 : true ,
              summary_data : tp 

            })


        })

    }

    handleSelect(date){
        // native Date object
        
        let p = Object.values(date)[0];
       
        let p3 = JSON.stringify(p.endDate);
        let p2 = JSON.stringify(p.startDate);
        console.log(p2) ; console.log(p3);
        
        this.setState({
          date : date
        })
      
      
    }

    get_data(){

      let p = Object.values(this.state.date)[0];
      
        let p2 = JSON.stringify(p.startDate);
        console.log(p2) ; 
        let p4 = 'http://10.42.0.51:8000/map/'+p2 ;

        fetch(p4)
        .then((Response) => Response.json())
        .then((json) => {

            let tp  = JSON.parse(json);
           
            
            var mydata = [] ;
            var skipcount = 0 ;

            for(var j =0 ;j < tp.length ;j++){ 
              
              
              var code = getCode(tp[j][0]) ; var myvalue = tp[j][1] ;
              

              if(tp[j][0] == "United States") code = "US";
              if(tp[j][0] == "Russia") code ="RU" ;
              if(tp[j][0] == "United Kingdom") code ="GB" ;

              if(typeof(code) == 'undefined' ) { console.log(code,tp[j]) ;skipcount = skipcount + 1 ; continue ;}
              

                
                mydata[j-skipcount] = {country: code, value: myvalue} ;
              
            }

            this.setState({


              map_data : mydata ,
              req1 : true 
            })
            
            
        })

       



    }


    display_all_summ(){
      const mydata = {
        labels: ['Alpha', 'Beta', 'Delta',
                 'Omicron'],
        datasets: [
          {
            label: 'Total cases Distro ',
            backgroundColor: [
              '#B21F00',
              '#C9DE00',
              '#2FDE00',
              '#00A6B4',
              
            ],
            hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            '#175000',
            'pink'
            ],
            data: [ this.state.summary_data[0][0][1] , this.state.summary_data[0][1][1], this.state.summary_data[0][2][1],  this.state.summary_data[0][3][1]]
          }
        ]
      };

      return(

        <>
        
        <div style ={{float:'right',
                width:"25%",
                height:"280px"}}>
            
            <Pie style={{height: "300px", width :"80%"}}
              data={mydata}
              options={{
                title:{
                  display:true,
                  text:' Cases Distribution',
                  fontSize:20
                },
                legend:{
                  display:true,
                  position:'right'
                },
                responsive : true,
                maintainAspectRatio: false
              }}
            />


            <h5> Total cases  : {this.state.summary_data[1]}</h5>
            <h5> Total Deaths : {this.state.summary_data[2]}</h5>
    
            
          </div>
        
        </>



      )



    }

    display_map(){

      //return(<> <p>Waiting for data</p></>) ;
      if(!this.state.req1) return(<> <p>Waiting for data</p></>) ;



      return(

        <>
        
        <WorldMap
                    color="red"
                    title="Top 10 Populous Countries"
                    
                    value-suffix="people"
                    size="responsive"
                    data={this.state.map_data}
                />
          

        
        </>


      )


    }

    setcolor(props){

        
        
        var maxc = 0;
        for(var i = 0; i< props.data.length; i++){

            maxc = Math.max(maxc,props.data[i].value);

            
        } 
      
        for(var i = 0; i< props.data.length; i++){
          this.data[i].value = this.data[i].value/maxc ;
          
        }
        
        


      
        


    }

    render(){

        const selectionRange = {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
          }


        if(!this.state.req0) return( <> <p>Waiting for the data </p> </>)

        return(

            

            <>

            {< this.display_all_summ />}
            {< this.display_map />} 



            
              <Button onClick={ this.get_data}>get data</Button>
                <h1> World page </h1>
            
                

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
                    
                    value={this.state.Stat_options}
                    />
                </span>
                <br></br>

                <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={this.handleSelect}
                />
            
            
            </>





        )
    }

}



export default (props) => (
    <World_info
        {...props}
        params={useParams()}
    />
);