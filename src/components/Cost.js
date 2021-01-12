
import React, {useState, useEffect} from 'react';

function Cost(props) {
    // general state variable
    const [cost,setCost] = useState(0);

    // increse gas price function 
    async function increaseCounter(){
      console.log('hey')
      const counter = props.contract;
      return counter.methods.increase().send()
        .on('receipt',async () => {
          const value = await counter.methods.value().call();
          setCost(value);
        });
      //console.log(increased)
      //return increased
    }
    
    //effect to initialize cost value
    useEffect(()=>{
      console.log('child effect ')
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
        <div>Cost value: {cost.toString()}
        <button onClick={increaseCounter}>Increase gas price</button>
        </div> 
    ); 
  }

  export default Cost;
