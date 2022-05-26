import Web3 from 'web3'
import {  toast } from 'react-toastify';
import { CONNECTION_FAILED, CONNECTION_REQUEST, CONNECTION_SUCCESS, UPDATE_ACCOUNT } from '../reducers/constants'
const abi=[
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "userId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "planId",
				"type": "bytes32"
			}
		],
		"name": "changePlan",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "userId",
				"type": "bytes32"
			}
		],
		"name": "deleteSubscription",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_userId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "planId",
				"type": "bytes32"
			}
		],
		"name": "Subcribe",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "userId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			}
		],
		"name": "SubscriptionCancelled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "userId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "planId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			}
		],
		"name": "SubscriptionCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "planId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			}
		],
		"name": "SubscriptionUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getSubscriptions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "userId",
						"type": "bytes32"
					},
					{
						"internalType": "bytes32",
						"name": "planId",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "wallet",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "createAt",
						"type": "uint256"
					}
				],
				"internalType": "struct Subscription.Sub[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "subscriptionsList",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "userId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "planId",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "createAt",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export const connect =()=>async dispatch =>{  
    dispatch({type:CONNECTION_REQUEST})
        if(window.ethereum){
            let web3 = new Web3(window.ethereum)
            try {
                const accounts = await window.ethereum.request({
                    method:"eth_accounts",
                });
				const contract_MM =new web3.eth.Contract(abi,'0x79d7dfe6320B6b186CbF2829E8833c564747621a')
			    const provider = new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/038808cf471142db926e8a3404f7abb3',
				
				)
			    let web3_infura = new Web3(provider)
			     const contract_Infura = new web3_infura.eth.Contract(abi,'0x79d7dfe6320B6b186CbF2829E8833c564747621a')
                dispatch({
                    type:CONNECTION_SUCCESS,
                    payload:{
                        account:accounts[0],
                        contract_Infura:contract_Infura,
                        contract_MM:contract_MM,
                        web3:web3
                    }
                })
                if(!accounts.length ){
                    toast.warn('Login to Metamask')
                }
               
                ;
                window.ethereum.on('accountsChanged',accounts=>{
                    dispatch(updateAccount(accounts[0]))
                })
                window.ethereum.on("chainChanged", () => {
                    window.location.reload();
                });

            } catch (error) {
                dispatch({
                    type:CONNECTION_FAILED,
                    payload:"Something went wrong"
                })
                toast.warn('Something went wrong')
            }
        }else{
            dispatch({
                type:CONNECTION_FAILED,
                payload:"You have not installed Metamask"
            })
            toast.warn("You have not installed Metamask")
        }
        
    
}

export const updateAccount =(account)=>async dispatch=> {
	dispatch({
		type:UPDATE_ACCOUNT,
		payload:{
			account:account
	}})
}
/*
           contract:0x79d7dfe6320B6b186CbF2829E8833c564747621a;
*/ 