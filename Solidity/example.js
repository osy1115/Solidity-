const Web3 = require('web3');
let connection = new Web3('http://127.0.0.1:8545');

connection.eth.getAccounts().then(data => {
    console.log(data)
})

connection.eth.getBalance('0xD5B010733F4212116e96965cE8bB66696D74C71B')
.then(data => {
    console.log(data) // 16진수가 아니라 10진수로 리턴함.
})

// 스마트 컨트랙트
// 코드(솔리디티)를 RPC통신으로 실행시킴.
// 솔리디티를 실행시키려면 컴파일 과정을 거쳐야함.
// hello.sol => 컴파일 -> abi & bin 파일
// abi : Application Binary Interface 런타임시 바이너리 코드와 데이터를 실행하기위한 json파일
// bin : 바이너리 파일로 결과물을 준다.
// 솔리디티 코드를 컴파일 하기 위해 npm install solc를 설치한다.