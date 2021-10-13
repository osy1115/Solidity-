const HelloToken = artifacts.require("HelloToken");

// /*
//  * uncomment accounts to access the test accounts made available by the
//  * Ethereum client
//  * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
//  */
// contract("HelloToken", function (/* accounts */) {
//   it("should assert true", async function () {
//     await HelloToken.deployed();
//     return assert.isTrue(true);
//   });
// });
contract("HelloToken",()=>{
  it("hello function call",async ()=>{
    // abi & bin 설정했을때 코드와 같음
    let instance = await HelloToken.deployed()
    let result = await instance.hello()
    console.log(`이아이는 콘솔로그 :`,result)
    return result
  })
})
