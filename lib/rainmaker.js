var rainMaker = web3.eth.contract(contracts.rainMaker.abi).at(contracts.rainMaker.address);
rainMaker.myDividends.call(function (err, result) {
    divs = parseFloat(web3.fromWei(result.toNumber()))
    $("#rainMakerDividends").html(divs.toFixed(3));
});

rainMaker.myTokens.call(function (err, result) {
    tokens = parseFloat(web3.fromWei(result.toNumber()))
    $("#rainMakerTokens").html(tokens.toFixed(1));
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