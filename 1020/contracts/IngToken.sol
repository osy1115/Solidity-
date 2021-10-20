// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol"; // 상속해야함
import "../node_modules/openzeppelin-solidity/contracts/security/Pausable.sol"; // 상속해야함


// Ownable은 배포자만 실행할수있게 처리해줌.
// Pausable은 bool true false
// pause() onlyowner unpause() onlyowner

contract IngToken is ERC20,Ownable,Pausable{
    string public _name = "INGOO TOKEN"; // override를 사용해서 언더바를 사용해야한다.
    string public _symbol = "ING";
    uint256 public _decimals = 18;
    uint256 public _totalSupply = 10000 * (10**uint256(decimals())); //10^18(제곱)
    string text = "hello world!";

    constructor() ERC20(_name,_symbol) {
      _mint(msg.sender,_totalSupply);
      }// 토큰 생성 끝
    

      function pause() public onlyOwner { 
        _pause();
      }

      function unpause() public onlyOwner {
        _unpause();
      }
    
}
