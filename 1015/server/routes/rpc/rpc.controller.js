const Web3 = require('web3')
const web3 = new Web3('http://localhost:7545') // 가나쉬 주소
const {abi} = require('../../../client/src/contracts/SimpleStorage.json')//.abi
const address = require("../../../client/src/contracts/SimpleStorage.json").networks["5777"].address
const ethTx = require('ethereumjs-tx').Transaction

const set = async (req,res) => {
    const {from,val} = req.body
    // transaction Object 만들어서 응답

    // set이라는 메서드는 어디?
    // web3 라이브러리를 사용해야함.

    const Instance = await new web3.eth.Contract(abi,address)
    const data = await Instance.methods.set(val).encodeABI()

    console.log(`data :`, data)
    console.log(`tohex:`,web3.utils.toHex(30000))

    let txObject = {
        from,
        to: address,//contract address
        data,// 배포한 set이라는 메서드를 인자값을 넣은 set(10) 얘를 바꿔줘야함
        gasLimit:web3.utils.toHex(30000), // 변환시켜줘야함 
        gasPrice:web3.utils.toHex(web3.utils.toWei('20','gwei')) /* wei -> hex */ 
    }
    res.json({
        success:true,
        rawTx:txObject
    })
}

const setTx = async (req,res) =>{
    const {from,val} = req.body
    // transaction Object 만들어서 응답

    // set이라는 메서드는 어디?
    // web3 라이브러리를 사용해야함.

    const Instance = await new web3.eth.Contract(abi,address)
    const data = await Instance.methods.set(val).encodeABI()
    const txCount = await web3.eth.getTransactionCount(from)

    console.log(`data :`, data)
    console.log(`tohex:`,web3.utils.toHex(3000000))

    let txObject = {
        nonce:web3.utils.toHex(txCount),//얘가 추가됨
        from,
        to: address,
        data,
        gasLimit:web3.utils.toHex(3000000), 
        gasPrice:web3.utils.toHex(web3.utils.toWei('20','gwei')) 
    }

    // 서명완료
    // sendTransaction은 개인키를 넣는 공간이 없어서 안씀
    // sendSignedTransaction()비밀키가 들어간 내용이 들어감
    // rawTx(txObject) + privateKey가 합쳐진 내용으로 보내야함.

    const tx = new ethTx(txObject)
    const privateKey = Buffer.from('a0e7c80bd826cb7d898f032ca43198a45e614988d14cc90ace25195945fc16fc','hex')
    tx.sign(privateKey) //개인키값...
    const seriaizedTx = tx.serialize()
    console.log(seriaizedTx.toString('hex'))

    const txhash = await web3.eth.sendSignedTransaction(`0x`+seriaizedTx.toString('hex'))
    res.json({
        success:true,
        txhash,
    })
}

module.exports={
    set,
    setTx
}