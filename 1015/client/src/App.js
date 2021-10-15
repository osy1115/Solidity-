import React, { Component, useState, useEffect, useReducer } from "react"; //상태를 만들어주는 useState
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import axios from 'axios'

import "./App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      let { web3, Instance, account } = action
      return {
        ...state,
        web3,
        Instance,
        account
      }
  }
}

const INIT_ACTIONS = (web3, Instance, account) => {
  return {
    type: "INIT",
    web3,
    Instance,
    account
  }
}

const App = () => {
  const initialstate = { //객체 집어넣고 리듀서에서 작업
    web3: null,
    Instance: null,
    account: null,
  }
  const [value, setValue] = useState(0)
  const [storage, setStorage] = useState(0)
  const [loading, setLoading] = useState(false) // true면 "loading", false면 storage 값을 보여준다, 41번째줄
  const [state, dispatch] = useReducer(reducer, initialstate)// reducer 선언방법


  const handleResult = (log, web3) => {
    //data : 0x0000000000000000
    //decodeLog 2개의 인자값 첫번째는 데이터형식(params), log.data
    const params = [ //SimpleStorage.sol에 이벤트값을 가져온다.
      { type: 'string', name: 'message' },
      { type: 'uint256', name: 'newVal' }
    ]
    const returnValues = web3.eth.abi.decodeLog(params, log.data)
    setStorage(returnValues.newVal)
    setLoading(prev => !prev)
  }


  //직접서명
  const send = async () => {
    const { account, Instance } = state
    if (value > 0) {
      setLoading(prev => !prev)
      //비동기적 처리
      await Instance.set(value, { from: account })
    }
  }

  // backend 거치고 서명
  const sendAPI = async () => {
    const {web3,account} = state
    if (value > 0) {
      setLoading(prev => !prev)
      //비동기적 처리
      /* 1. 백엔드에 요청. 비동기(axios 설치)
         2. 백엔드에서 rawTx 객체를 반환해준다
         3. 반환받은 값을 sendTransaction()에 실행한다.(실질적 서명)
      */
      // web3.eth.sendTransaction()
      const result = await axios.post('http://localhost:3001/rpc/set',{ from:account, val:value })
      if (result.data !== undefined && result.data.rawTx !== undefined && result.data.success == true){
        await web3.eth.sendTransaction(result.data.rawTx)
      }
      // rawTx = {
      //   "from":"address...",
      //   "to":"",
      //   "data":"실질적인 데이터부분",
      //   "gasLimit":"",
      //   "gasPrice":"",
      // }

      //https://web3js.readthedocs.io/en/v1.5.2/web3-eth.html#id70
    }
  }


  // Backend 서명
  const sendTx = async () => {
      const {account} = state
    if (value > 0) {
      setLoading(prev => !prev)
      //비동기적 처리
      const result = await axios.post('http://localhost:3001/rpc/setTx',{ from:account, val:value })
      
    }
  }


  const handleChange = (e) => { //onChange가 실행될때마다 바꿔주는
    const val = e.target.value
    setValue(val)
  }

  const INIT = async () => {
    const contract = require('@truffle/contract')
    const web3 = await getWeb3()
    const [account] = await web3.eth.getAccounts()
    // const networkID = await web3.eth.net.getId()

    let SimpleStorage = contract(SimpleStorageContract)
    SimpleStorage.setProvider(web3.currentProvider)

    const Instance = await SimpleStorage.deployed()

    //작성한 변수값에 접근할 수 있는 인스턴스값을 구한 과정, 콘솔로그로 찍어서 확인.
    

    dispatch(INIT_ACTIONS(web3, Instance, account)) //페이지가 한번 렌더가 되고 차례대로 코드가 실행되면서 INIT_ACTIONS까지 실행될것이다.

    web3.eth.subscribe("logs", { address: Instance.address }) //배포가 된 주소임. 사용자의 주소가 아니고.
      .on('data', log => {
        handleResult(log, web3)
      })
      .on('error', err => console.log(err))
  }

  useEffect(() => {
    INIT()
  }, [])

  return ( //화면 꾸미기
    <div>
      <input type="text" value={value} onChange={handleChange} />
      <div>
        <button onClick={send}>일반서명</button>
        <button onClick={sendAPI}>server 거치고 서명</button>
        <button onClick={sendTx}>backend 서명</button>
      </div>
      <div>
        {loading ? 'loading' : storage}
      </div>
    </div>
  )
}

export default App;
