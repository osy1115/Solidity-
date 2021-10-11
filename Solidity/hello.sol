pragma solidity ^0.8.0;

contract hello{
    string value;
    constructor(){
        value = "hello world!";
    }
    
    function get() public view returns(string memory){
        return value;
    }
    // solcjs --bin --abi .\hello.sol 이 명령어로 컴파일해본다.
    // 성공하면 hello_sol_hello.abi, hello_sol_hello.bin 각각 생성된다
    //[파일명]_[확장자]_[컨트랙트명]
}

