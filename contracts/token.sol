pragma solidity ^0.4.18;
//! FrozenToken ECR20-compliant token contract
//! By Parity Technologies, 2017.
//! Released under the Apache Licence 2.

// Owned contract.
contract Owned {
	modifier only_owner { require (msg.sender == owner); _; }

	event NewOwner(address indexed old, address indexed current);

	function setOwner(address _new) public only_owner { NewOwner(owner, _new); owner = _new; }

	address public owner;  
} 

// FrozenToken, a bit like an ECR20 token (though not - as it doesn't
// implement most of the API).
// All token balances are generally non-transferable.
// All "tokens" belong to the owner (who is uniquely liquid) at construction.
// Liquid accounts can make other accounts liquid and send their tokens
// to other axccounts.
contract FrozenToken {
	event Transfer(address indexed from, address indexed to, uint256 value);

	// this is as basic as can be, only the associated balance & allowances
	struct Account {
		uint balance;
	}

	// balance of a specific address
	function balanceOf(address _who) public constant returns (uint256) {
		return accounts[_who].balance;
	}

	// transfer
	function transfer(address _to, uint256 _value)
		public
		returns(bool)
	{
		assert(false);
		accounts[_to].balance -= _value; 
	}

	// no default function, simple contract only, entry-level users
	function() public {
		assert(false);
	}

	// a value should be > 0
	modifier when_non_zero(uint _value) {
		require (_value > 0);
		_;
	}

	// Available token supply
	uint public totalSupply;

	// Storage and mapping of all balances & allowances
	mapping (address => Account) accounts;

	// Conventional metadata.
	string public constant name = "Na Ratunek";
	string public constant symbol = "FNR";
	uint8 public constant decimals = 0;
}

contract Foundation is FrozenToken,Owned {
    uint256 public minValue;
    address public treasury;
    mapping (address => uint256) public lastPayment;
     
    function Foundation(address _owner, address _treasury) public { 
        owner = _owner;
        treasury = _treasury;
    } 
      
    function setMinValue(uint256 _minValue) public only_owner {
        minValue = _minValue;
    }
    
    function setTreasury(address _treasury) public only_owner {
        treasury = _treasury;
    }
     
    function donate() public payable {
        require(lastPayment[msg.sender] + 5000 < block.number);
        require(msg.value > minValue);
        
        totalSupply += 1;
        accounts[msg.sender].balance += 1;
        lastPayment[msg.sender] = block.number;
        
        treasury.transfer(msg.value);
        TokenCreated(msg.sender);
    }
    
    event TokenCreated(address indexed owner);
}

