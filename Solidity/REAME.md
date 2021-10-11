nodejs 환경에서 세팅 가능.

Truffle
Ganashe

npm install -g truffle
npm install -g ganache-cli
npm install web3

## web3란?
RPC통신을 쉽게 구현하도록 도와주는 라이브러리.

web은 npm init하고 설치.

truffle version 으로 확인.
ganache-cli --host 0.0.0.0 으로 확인.
안되면 앞에 npx 붙여서 해보자.

가나쉬는 데몬, 웹소켓 서버라고 생각하자.

# 가스(gas) 란?
이더리움 스마트 컨트랙트를 배포하고 실행할때, 사용되는 수수료.

# 가스 가격(gas price)
스마트 컨트랙트를 발생할때 설정한 가격.

# 가스 한도(gas limit)
수수료 한도 설정.

가나쉬는 데몬이니까 RPC통신을 통해서 특정 주소에 있는 이더리움의 수량을 구할 수 있다.


# curl "shell" script는 linux에서 가능하다. (curl 명령어)

eth_accounts
eth_getbalance

curl -X POST -d '{"jsonrpc":"2.0","method":"eth_accounts"}' http://127.0.0.1:8545 를 wsl에 실행해보자.
curl -X POST -d '{"jsonrpc":"2.0","method":"eth_getbalance","params":["0xD5B010733F4212116e96965cE8bB66696D74C71B"]}' http://127.0.0.1:8545


web3 라이브러리 사용(자바스크립트 사용)