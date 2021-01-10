pragma solidity ^0.5.0; 

contract Cost { 
    uint256 public value; 
    
    event Increased(uint256 newValue);

    function increase() public { 
        value = value + 1; 
        emit Increased(value); 
    } 
}