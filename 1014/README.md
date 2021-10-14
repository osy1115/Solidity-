# DApp => Truffle => React

# DApp

# Truffle

# React에서 배포한 스마트 컨트랙트 내용을 가져오는 행위를

# 배포한 컨트랙트 내용을 가져올 때 web3를 사용했다는 점 기억해야함

web에서 메타마스크 연결은 Truffle이 알아서 해준다.

# Truffle 
npm install -g Truffle

작업공간까지 디렉토리 이동

1. Truffle unbox react 실행(Unbox successful, sweet! 떠야된다)
2. ganache 실행후 메타마스크 연결
3. 메타마스크로 돌아가서 가나시 서버가 아니라 테스트넷 서버로 설정해서 포셋(가상 이더) 얻기(1번 과정이 성공해야 사이트가 실행된다.)
4. 내가 배포할 contract 코드 작성
- 미리 빌드했던거 지움. src/contracts 안 파일 두개
- contract랑 migration 안에도 지우기
> truffle create contract Fruitshop
> truffle create migration Fruitshop
5. contract 코드 컴파일 하기
> truffle compile
6. contract 내용 배포하기
> truffle migrate
7. react 실행하기
> cd client && npm run start
(메타마스크는 client와 블록체인을 연결해주는 중간다리역할을 한다)
8. truffle/contract 설치하고 사용하기
> npm install @truffle/contract
- 디렉토리가 client안에 들어가있는거 확인하고 npm install 해야함
9. buy, sell 함수 작성
10. npm run start 하고 직접 사고 팔아서 확인해보자