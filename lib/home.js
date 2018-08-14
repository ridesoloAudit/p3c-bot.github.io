if(localStorage.getItem('masternode')){
    $(".dashboard-link").attr("href", "/index.html?masternode=" + localStorage.getItem('masternode'))
}

// change all links to include masternode


