var divies = web3.eth.contract(contracts.divs.abi).at(contracts.divs.address);
divies.balances.call(function (err, result) {
    balance = parseFloat(web3.fromWei(result.toNumber()))
    $("#divsBalance").html(balance.toFixed(3));
});

$("#distribute").click(function () {
    divies.distribute.sendTransaction({
        from: web3.eth.accounts[0]
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

$('#distribute').qtip({ // Grab some elements to apply the tooltip to
    content: {
        text: 'Distribute global dividends to P3C. This is shared with all holders proportionally.'
    }
})

$('#divs').qtip({ // Grab some elements to apply the tooltip to
    content: {
        text: 'The amount of global dividends currently awating distribution.'
    }
})