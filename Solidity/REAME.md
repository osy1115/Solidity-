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


# 투표앱

1. 솔리디티 코드작성
2. 솔리디티 코드 컴파일
    solcjs --abi --bin
    결과물 abi, bin
3. 컴파일 결과 스마트컨트랙트 배포
    (web3 라이브러리 활용해서 deploy함)
    - deploy.js 파일 만들기
    - web3 라이브러리 가져오고
    - 내가 현재 사용하고 있는 블록체인 서버에 연결 = 가나쉬
    - 배포하기위해 Contract 메서드를 사용해서 블록생성
    - 결과값 배포하기(deploy)
4. 컴파일 결과를 js코드로 불러올수있는지 테스트,
5. html에서 js web3 활용하여 내용을 불러옴

# 메타마스크

핫 월렛 : 온라인지갑
콜드 월렛 : 오프라인지갑

핫 월렛
- 수탁형 지갑 : 거래소에 저장된 지갑. 제 3자에 의해 보관되는 지갑.
- 비수탁형 지갑 : 본인이 직접 관리하는 지갑

주소를 보관하는 공간.
코인마다 지갑이 다르기 때문에 주소도 다 다르다.
해당하는 주소내용을 조회활수 있고 주소의 코인을 볼 수 있게 해준다.
아니면 다른 주소로 코인을 보낼 수도 있다. 계좌같은 거라고 생각.


주소
- 공개키(주소) 20자리 가지고 있는 키
- 암호키(개인)

계정
- EOA(이더를 보낼 수 있는 계정, 스마트컨트랙트 트랜잭션을 보낼 수 있음)
- 컨트랙트계정(솔리디티 언어를 배포한 계정)

지갑
- 계정을 총괄 관리하는 공간

메타마스크
- 개인이 보관하는 것, 온라인에 보관함
- 크롬 확장프로그램
- react devtool

- 메타마스크는 개인키를 요구한다. 왜? 우리는 만드는 과정을 모르기 때문. 

1.  개인키를 keccak256()을 이용해 생성.
2.  그 개인키를 갖고 공개키를 생성함. 
    그 말인 즉슨, 개인키를 가지고 있으면 공개키도 알 수 있다. 
    하지만 공개키만 알면 개인키는 알 수 없다.
    개인키 해시함수를 사용해서 결과값을 갖고 뒷자리 20bit 만큼 짤라서 사용하는게 공개키이다.


# truffle

DApp 프레임워크

1. 솔리디티 코딩한다. => 컴파일 ABI,BIN
2. 솔리디티 배포한다. deploy.js => transaction address
3. web3를 활용하여 프론트엔드를 만든다.

이 작업을 간소화해주는게 truffle이다.

프레임워크란 디렉토리 구조가 있는 개발환경.
디렉토리 만드는 과정

truffle init 실행하면 폴더 3개, 파일 1개 생성됨

1. contracts => 솔리디티 작성공간.
2. migrations => deploy 메서드가 사용되는 공간. 데몬에게 배포하는 행위를 하는 공간. 새 파일을 생성할때 파일 이름을 [번호]_[파일명] 이렇게 해줘야한다.
3. test => TDD코드를 작성하는 공간
4. truffle-config.js => truffle에 관련된 환경설정 파일.

얘네는 truffle 자동적으로 해주는 코드들이다. 건드리지말자.


# 간소화 명령어들

- truffle compile
    build 폴더 생성됨
- truffle migrate
    배포해주는 명령어
- truffle test
    테스트해주는 명령어


# truffle 순서

1. 솔리디티 파일생성
truffle create contract [파일명]

```
function hello() public view returns(string memory){
    return "hello";
  }
```

2. 솔리디티 파일 컴파일하기.
truffle compile
이후 build/contracts [파일명].json 생성되는 것 확인하기.

3. migration 코드 작성하기
migrations 폴더안에서 파일생성 규칙은 [숫자]_[파일명] 

const [파일명] = artifacts.require("[파일명]");

module.exports = function (deployer) {
  deployer.deploy([파일명]);
};

이후 truffle migrate 실행

4. 테스트 작업

파일 생성하기
truffle create test [파일명]
이후 코드 작성

```
contract("HelloToken",()=>{
  it("hello function call2",async ()=>{
    let instance = await HelloToken.deployed()
    let result = await instance.hello()
    console.log(`이아이는 콘솔로그 : `,result)
    return result
  })
})
```

이후 truffle test 실행