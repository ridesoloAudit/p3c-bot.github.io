if(localStorage.getItem('masternode')){
    $(".dashboard-link").attr("href", "/interact.html?masternode=" + localStorage.getItem('masternode'))
}