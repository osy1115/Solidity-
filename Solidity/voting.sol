pragma solidity ^0.8.0;

//객체지향언어라 무조건 코드 블록 안에서 작성

contract voting{
    // 후보자들 초기화
    // 후보자들에 투표기능
    // 후보자들의 각 투표개수
    string[] public candidateList; //전역변수로 설정
    mapping(string => uint) public voteReceived; //투표기능
    //객체
    /* let voteReceived= {
        ingoo1:0,
        ingoo2:0,
        ingoo3:0
    } 
    */
    constructor(string[] memory _candidateNames) public{
        candidateList = _candidateNames;
    }

    function voteForCandidate(string memory _candidate) public{ //투표기능
        voteReceived[_candidate] +=1;
    }

    // 후보자명을 넣어주면 결과값이 투표개수를 
    function totalVotesFor(string memory _candidate) view public returns(uint){
        return voteReceived[_candidate];
    }
    
    function validCandidate(string memory _candidate) public returns(bool){
        // string to byte
        // keccak256() 메서드 안에 byte 값 넣기
        for(uint i = 0; i < candidateList.length; i++){
            if(keccak256(bytes(candidateList[i])) == keccak256(bytes(_candidate))){
                return true;
            }
        }
        return false;
    }
/*
    arr = ['ingoo1','ingoo2','ingoo3']
    searchText = 'ingoo4'

    //완전탐색 0(n)
    function check(txt){
        for(i = 0; i <arr.length; i++){
            if(arr[i] == txt){
                return true;
            }
        }
        return false;
    }
    console.log(check(searchText));
    */
}

