pragma solidity ^0.4.19;

import "./zombiefactory.sol";

contract ZombieFeeding is ZombieFactory {

    function feedAndMultiply(uint _zombieId, uint _targetDna) public {
        require(msg.sender == zombieToOwner[_zombieId]); //zombieToOwner가 id값 받음
        Zombie storage myZombie = zombies[_zombieId];
    }

}
