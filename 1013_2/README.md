Commands:

  Compile:              truffle compile
  Migrate:              truffle migrate
  Test contracts:       truffle test
  Test dapp:            cd client && npm test
  Run dev server:       cd client && npm run start
  Build for production: cd client && npm run build


# truffle 설정

  1. 내가 어떤 데몬을 돌릴 것인가?
  - truffle-config.js 파일 수정(전에 작성한 truffle-config.js에서 가져와서 복붙해준다)
  
  2. solidity 컴파일하기
  truffle compile 실행
  build 폴더가 src/contracts에 SimpleStorage.json이 생김

  3. solidity 배포하기
  truffle migrate 실행

  4. react 실행하기
  npm run start
  
  리액트와 계정 연결해서 컴파일과 배포가 잘 되면 숫자 5가 뜬다.
