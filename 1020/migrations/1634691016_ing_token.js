const IngToken = artifacts.require("IngToken");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(IngToken);

};
