pragma solidity ^0.4.21;

interface P3C {
  function() payable external;
  function buy(address _playerAddress) payable external returns(uint256);
  function sell(uint256 _amountOfTokens) external;
  function reinvest() external;
  function withdraw() external;
  function exit() external;
  function dividendsOf(address _playerAddress) external view returns(uint256);
  function balanceOf(address _playerAddress) external view returns(uint256);
  function transfer(address _toAddress, uint256 _amountOfTokens) external returns(bool);
  function stakingRequirement() external view returns(uint256);
  function myDividends(bool _includeReferralBonus) external view returns(uint256);
}

contract Crop {
  address public owner;
  bool public disabled;

  address public p3cAddress = 0xDF9AaC76b722B08511A4C561607A9bf3AfA62E49;

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function() public payable {}
  
  /**
   * @dev Turn reinvest on / off
   * @param _disabled bool to determine state of reinvest.
   */
  function disable(bool _disabled) external onlyOwner() {
    // toggle disabled
    disabled = _disabled;
  }

  /**
   * @dev Enables anyone with a masternode to earn referral fees on P3D reinvestments.
   */
  function reinvest() external {
    // reinvest must be enabled
    require(disabled == false);
    
    // setup p3c
    P3C p3c = P3C(0xDF9AaC76b722B08511A4C561607A9bf3AfA62E49);

    // withdraw dividends
    p3c.withdraw();

    // reinvest with a referral fee for sender
    p3c.buy.value(address(this).balance)(msg.sender);
  }

  /**
   * @dev Buy P3D tokens
   * @param _playerAddress referral address.
   */
  function buy(address _playerAddress) external payable onlyOwner() {
    P3C(p3cAddress).buy.value(msg.value)(_playerAddress);
  }

  /**
   * @dev Sell P3D tokens and send balance to owner
   * @param _amountOfTokens amount of tokens to sell.
   */
  function sell(uint256 _amountOfTokens) external onlyOwner() {
    // sell tokens
    P3C(p3cAddress).sell(_amountOfTokens);

    // transfer to owner
    owner.transfer(address(this).balance);
  }

  /**
   * @dev Withdraw P3D dividends and send balance to owner
   */
  function withdraw() external onlyOwner() {
    // withdraw dividends
    P3C(p3cAddress).withdraw();

    // transfer to owner
    owner.transfer(address(this).balance);
  }

  /**
   * @dev Sell P3D tokens, withdraw dividends, and send balance to owner
   */
  function exit() external onlyOwner() {
    // sell all tokens and withdraw
    P3C(p3cAddress).exit();

    // transfer to owner
    owner.transfer(address(this).balance);
  }
  
  /**
   * @dev Transfer P3D tokens
   * @param _toAddress address to send tokens to.
   * @param _amountOfTokens amount of tokens to send.
   */
  function transfer(address _toAddress, uint256 _amountOfTokens) external onlyOwner() returns (bool) {
    return P3C(p3cAddress).transfer(_toAddress, _amountOfTokens);
  }

  /**
   * @dev Get dividends for this contract
   * @param _includeReferralBonus for including referrals in dividends.
   */
  function dividends(bool _includeReferralBonus) external view returns (uint256) {
    return P3C(p3cAddress).myDividends(_includeReferralBonus);
  }
}