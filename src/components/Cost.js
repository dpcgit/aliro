
import React, {useState, useEffect} from 'react';

function Cost(props) {
    // general state variable
    const [cost,setCost] = useState(0);
    
    //effect to initialize cost value
    useEffect(()=>{
      const getInitCostValue = async ()=> {
        console.log('props',props)
        console.log(props.contract)
        //const cost_value = props.contract; 
        const cost_val = await props.contract.methods.value().call();
        console.log(cost_val)
        setCost(cost_val)
      }
      getInitCostValue();
    }, [props]);
   
    return ( 
        <div>Cost value: {cost.toString()}</div> 
    ); 
  }

  export default Cost;
