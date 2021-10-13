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