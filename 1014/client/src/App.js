import React, { useState, useEffect, useReducer } from "react"; // 상태값을 관리해주는 
import FruitshopContract from "./contracts/Fruitshop.json";
import getWeb3 from "./getWeb3";
// import contract from '@truffle/contract'//web3랑 같이 사용해야함

import "./App.css";

const App = () => {
  const [myApple,setMyApple] = useState(0)
  let initialstate = {web3:null,instance:null,accounts:null}
  const [state,dispatch] = useReducer(reducer,initialstate)

  function reducer(state,action){
    switch(action.type){
      case "INIT":
        let {web3,instance,accounts} = action;
        return{
          ...state,
          web3,
          instance,
          accounts
        }
    }
  }

  const buyApple = async () => {
    //instance 값을 가져와야함
    let {instance,accounts,web3} = state;
    await instance.buyApple({
      from:accounts,
      value:web3.utils.toWei("10","ether"), //단위가 wei라서 이더에
      gas:90000,
    })
    setMyApple(prev => prev+1) //(myApple+1)
  }

  const sellApple = async () => {
    let {instance,accounts,web3} = state
    await instance.sellApple(web3.utils.toWei("10","ether"),{
      from:accounts,
      gas:90000,
    })
    setMyApple(0)
  }

  const getApple = async (instance) => {
    if(instance == null) return
    let result = await instance.getMyApple()
    setMyApple(result.toNumber())
  }

  const getWeb = async () => {
    const contract = require('@truffle/contract');

    let web3 = await getWeb3()
    let fruitshop = contract(FruitshopContract)
    fruitshop.setProvider(web3.currentProvider)

    let instance = await fruitshop.deployed()
    let accounts = await web3.eth.getAccounts()

    let InitActions = {
      type:"INIT",
      web3,
      instance,
      accounts:accounts[0]
    }
    dispatch(InitActions)
    getApple(instance)
    // console.log(accounts)
    // console.log(instance)
    //계정가져오기
    // instance.sellApple()
    // instance.buyApple()

    // web과 instance, account 값 상태에 저장하기
    // 현재 내가 가지고 있는 사과를 리턴해주는 함수를 만들어야한다.
  }

  // componentDidMount WEB3를 가져와서 메타마스크 연결

  useEffect(()=>{ //화면에 실행되도록
    getWeb()
  },[])

  return ( //js를 html같이 사용하게 만드는 것(바벨)
    <div>
      <h1>사과 가격 : 10 ETH</h1>
      <button onClick={()=>buyApple()}>Buy</button>
      <p>내가 갖고 있는 사과 : {myApple}</p>
      <button onClick={()=>sellApple()}>sell(판매가격은:{myApple*10}ETH)</button>
    </div>
  )
}

export default App;
