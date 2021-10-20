# 설정

가나쉬
메타마스크
truffle init
truffle-config.js 수정

# 작업순서
1. 환경설정
2. 코드작성
3. 가나쉬 배포(로컬배포)
4. 테스트넷 배포(테스트넷 이더리움, 이더스캔) <-여기까지하면됨.
5. 메인넷 배포(실제개발은 여기까지함)

# 오픈제펠린 사용

- 블록체인 불변성
 컨트랙트를 수정할 수 있게 도와주는 라이브러리.
 proxy contarct logic contract
 함수호출을 abi통해서가 아니라 직접호출로 처리하는 방법을 알아야한다.
- 수수료
 이더리움 개념
 gas station network
 사용자가 트랜잭션을 발생시켜도 이더가 소비되지 않음.
 배포자가 내서(?)
- 작성된 코드
 ERC20, ERC721 인터페이스 구현
 solidity 8
 lock
 pausable
 owner

 # my ether wallet(mew)

 metamask 같은 지갑(온라인 브라우저 사이트)
 스마트컨트랙트에 대한 메서드나 내용들을 볼 수 있는 기능이 있다.
 https://myetherwallet.com

 # 오픈제펠린 
- 환경설정

 root 폴더 안에서 
 > npm init
 > npm install openzeppelin-solidity
 > truffle-config.js 에서 compilers/solc/version 버전 바꾸기 0.8.1로

- 코드작성
 truffle create contract IngToken
 truffle create migration IngToken
 >IngToken.sol 작성
 >ing_token.js 작성


- 가나쉬 배포(로컬)

> truffle compile
> truffle migrate


contract address
0x4fe59C67383ef4dB563fA0ee3E8D23B04b1Bc69d

ABI

EOA address
0x74387E811EAF4F258699B441aCcAc80f44282087

MEW가서 실행해봄.


build/contracts
파일 삭제 후

> truffle compile
> truffle migrate
\

contract address 
0x7B6182D640BD18973ED81cE290b6e896569b4f96

MEW가서 다시 실행해봄
그리고 실행한 컨트랙트 주소를 가지고 메타마스크에서 토큰을 임포트하고 새로 계정 하나 생성해서 500개만 보내봄


# import 해야할 것들. 각각 상속까지 해줘야 한다.

- Ownable.sol
    배포자만 실행할 수 있게 해주는 라이브러리
- Pausable.sol
    메서드를 호출하면 pause() unpause() 각각 사용가능함. 

코드 구현후 다시 컴파일, 재배포

contract address
0xD2D3847c4b17EF4c79840900217B9A851d6eB41f

다시 MEW가서 확인

# testnet 배포하기
https://infura.io 으로 들어가서
이더리움 탭에 ingoo 프로젝트 클릭하고 setting에 들어가서 endpoints를 ropsten으로 바꿔줌


truffle-config.js 파일 수정
21~24번째줄 주석 해제하기
npm install @truffle/hdwallet-provider
.secret 파일 생성해줘야함(root폴더인 상태에서)
60~67번째줄 주석 해제(64~71번째줄)
나는 65번째줄에 url부분에 project-id(infura)값을 넣어주면 됨.

메타마스크 시드문구를
.secret에다가 넣어줘야함.
내 시드문구(happy hockey rescue image never rice athlete forward sleep high happy dose)

> truffle compile
> truffle migrate --network ropsten

그리고 etherscan으로 가서 확인해봄.
메인페이지에서 오른쪽에 있는 이더마크를 누르면 ropsten을 선택한다.
그리고 나오는 검색창에 코인이름이나 터미널에 있는 트랜잭션해쉬값(Txn)을 복사해서 붙여넣는다.
나오면 배포된것이다.