/* 가나쉬 연결 */


const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) //노드js 자바스크립트를 해석하지 않고 브라우저로 바로 보내도록

const ABI = JSON.parse(`[{"inputs":[{"internalType":"string[]","name":"_candidateNames","type":"string[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidateList","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_candidate","type":"string"}],"name":"totalVotesFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_candidate","type":"string"}],"name":"validCandidate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_candidate","type":"string"}],"name":"voteForCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"voteReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]`);
const deployAddress = `0xc54e08da16d942da32b0afe17c3728fd8df5a4c2`;

let VotingContract = new web3.eth.Contract(ABI,deployAddress)
let candidates = {"ingoo1":"candidate1","ingoo2":"candidate2","ingoo3":"candidate3"} // html

window.addEventListener('DOMContentLoaded',init)
async function init(){
    let candidataNames = Object.keys(candidates) //html 이름 가져오기
    for(let i = 0; i < candidataNames.length; i++){ // 3
        let name = candidataNames[i] //ingoo1
        // candidate1 갖고 오고 싶다.
        candidates[name]
        const nameElement = document.querySelector(`#${candidates[name]}`)
        nameElement.innerHTML = name;

        const countElement = document.querySelector(`#candidateCount${i+1}`) //html 숫자 
        countElement.innerHTML =  await VotingContract.methods.totalVotesFor('ingoo1').call() // 이건 안됨 .then(data =>{console.log(data);
    }

    // await VotingContract.methods.voteForCandidate('ingoo1').send({from:'0x6B806c1018C209f70bB34c7d658F4aDF3DbD3C14'})
    // VotingContract.methods.totalVotesFor('ingoo1').call().then(data =>{
    // console.log(data)
    // })
}

let btn = document.querySelector(`#btn`) //버튼 가져오기. 반복문이 아닌 한번만 실행해야하기 때문에 따로 설정해준다.
btn.addEventListener('click',btnEvent)

async function btnEvent(){
    // 이 코드블록에서 실행함.
    let candidateName = document.querySelector(`#candidateName`).value;
    await VotingContract.methods.voteForCandidate(candidateName).send({from:'0x6B806c1018C209f70bB34c7d658F4aDF3DbD3C14'})

    let candidateCount = await VotingContract.methods.totalVotesFor(candidateName).call()
    let number = candidateName.charAt(candidateName.length-1)
    let countElement = document.querySelector(`#candidateCount${number}`)
    countElement.innerHTML = candidateCount;
}

// 이 과정을 DApp이라고 한다.