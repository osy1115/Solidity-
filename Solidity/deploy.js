const Web3 = require('web3')
const fs = require('fs')
const ABI = JSON.parse(fs.readFileSync('./voting_sol_voting.abi').toString()) //JSON.parse : 객체로 변환해줌
const BYTECODE = fs.readFileSync('./voting_sol_voting.bin').toString()

let web3 = new Web3('http://localhost:8545')

const deployContract = new web3.eth.Contract(ABI); // 블럭생성할때 솔리디티 컴파일한 abi을 인자값에 넣음.

// deployContract.deploy({
//     data:BYTECODE,     // 배포할때 솔리디티 컴파일한 byte값 넣음
//     // 배포할때 voting.sol.constructor 인자값을 넣어줘야함
//     arguments:[['ingoo1','ingoo2','ingoo3'].map(name => web3.utils.asciiToHex(name))] // 16진수 변환
// })
// .send({
//     from:'0x3434bF02b5DbB4eb98052AB868af9B8B12b36040',
//     gas:6721975,
// })
// .then(newContract=>{
//     console.log(newContract.options.address)
// })

// 해당 블록 주소에 접속해야된다.
const contract = new web3.eth.Contract(ABI,'0xc54e08da16d942da32b0afe17c3728fd8df5a4c2');

contract.methods.voteForCandidate('ingoo1').send({from:'0x6B806c1018C209f70bB34c7d658F4aDF3DbD3C14'})
contract.methods.totalVotesFor('ingoo1').call().then(data =>{// call()까지 실행해야 프로미스객체 가져옴
    console.log(data)
}) 
// send의 역할, 이더를 갖고 있는 누군가 투표했다. 그게 누구인지 알려줌.