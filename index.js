// Copyright (c) 2016 Axel Smeets

var page = require('webpage').create()
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36'

var env = require('system').env
if (!env.LKFQ_USERID || !env.LKFQ_PASSW) {
    console.log("Must have LKFQ_USERID and PASSW env vars")
    console.log("windows: set {LKFQ_USERID,LKFQ_PASSW}={ssn,password}")
    console.log("*nix: export {LKFQ_USERID,LKFQ_PASSW}={ssn,password}")
    phantom.exit()
}

var steps = [
    function() { page.open('http://marknad.lkf.se/User/MyPagesLogin.aspx') },
    function() {
        // Enter Credentials
        page.evaluate(function(userid, password) {
            var email = document.getElementById('ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col2_LoginControl1_txtUserID')
            var passw = document.getElementById('ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col2_LoginControl1_txtPassword')

            email.value = userid
            passw.value = password
        }, env.LKFQ_USERID, env.LKFQ_PASSW)
    },
    function() {
        // Login
        page.evaluate(function() {
            document.getElementById('ctl00_ctl01_DefaultSiteContentPlaceHolder1_Col2_LoginControl1_btnLogin').click()
        })
    },
    function() { page.render("proof.png") }
]

var testindex = 0, loadInProgress = false

page.onLoadStarted = function() {
  loadInProgress = true
}

page.onLoadFinished = function() {
  loadInProgress = false
}

interval = setInterval(function() {
    if (!loadInProgress && typeof steps[testindex] == "function") {
        steps[testindex]()
        testindex++
    }

    if (typeof steps[testindex] != "function") {
        phantom.exit()
    }
}, 50)
