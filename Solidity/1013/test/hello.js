const hello = artifacts.require("hello");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Hello",()=>{
  it("helloworld function call",async ()=>{
    // abi & bin 설정했을때 코드와 같음
    let instance = await hello.deployed()
    let result = await instance.helloworld()
    console.log(result)
    return result
  })
})
