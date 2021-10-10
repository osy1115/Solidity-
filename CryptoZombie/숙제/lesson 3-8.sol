pragma solidity ^0.4.19;

import "./zombiefeeding.sol";

contract ZombieHelper is ZombieFeeding {

  modifier aboveLevel(uint _level, uint _zombieId){
     require (zombies[_zombieId].level >= _level); //require를 꼭 써줘야한다
    _;
  }

}
