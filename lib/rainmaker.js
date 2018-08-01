rainMakerAbi = [{ "constant": true, "inputs": [], "name": "myDividends", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "makeItRain", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "p3cAddress", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "myTokens", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }];

var rainMaker = web3.eth.contract(rainMakerAbi).at('0xa4ee9e650951b987d23367e29ce49f5350706a49');
rainMaker.myDividends.call(function (err, result) {
    divs = parseFloat(web3.fromWei(result.toNumber()))
    $("#rainMakerDividends").html(divs.toFixed(3));
});

$("#makeItRain").click(function () {
    rainMaker.makeItRain.sendTransaction({
        from: web3.eth.accounts[0],
        gas: 1000000
    }, function (error, result) { //get callback from function which is your transaction key
        if (!error) {
            console.log(result);
        } else {
            console.log(error);
        }
    })
})

$('.selector').qtip({
    style: { classes: 'qtip' }
});

$('#makeItRain').qtip({ // Grab some elements to apply the tooltip to
    content: {
        text: 'Cause the RainMaker to use its dividends to purchase tokens and distribute gains to all players!'
    }
})

$('#rainMaker').qtip({ // Grab some elements to apply the tooltip to
    content: {
        text: 'The amount of dividends the RainMaker contract currently holds. It can only ever reinvest them!'
    }
})