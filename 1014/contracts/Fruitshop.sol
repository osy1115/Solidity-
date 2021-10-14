// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/* 
    1. 보낸 사람의 계정(주소)에서 사과를 총 몇개 가지고 있나. 
    2. 사과를 구매했을 때, 해당 계정(주소)에 사과를 추가해주는 코드 작성
    3. 사과 판매시 내가 가지고 있는 사과*사과구매가격 만큼 토큰을 반환해주고 사과를 0개로 바꿔준다.
    4. 내 사과를 반환해주는
*/

contract Fruitshop {
  mapping(address => uint) myApple; // 이게 첫번째 
  constructor() public {
  }
  
  function buyApple() payable public { // 두번째 사과 추가 코드
     myApple[msg.sender]++;
  }

  function getMyApple() public view returns(uint){
    return myApple[msg.sender];
  }

  function sellApple(uint _appleprice) payable public { // 판매하는
    uint totalPrice = (myApple[msg.sender] * _appleprice);
    myApple[msg.sender] = 0;
    msg.sender.transfer(totalPrice); // vsc에서 솔리디티 해석해주는 것과 트러플에서 해석해주는 버전 차이로 에러나는?
  }
}

