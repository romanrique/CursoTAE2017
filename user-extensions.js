Selenium.prototype.assertFormMenu = function(locator, value) {
    var args = new Array();
    args = value.split("|");
    var formMenu = this.browserbot.findElement(locator);

    //Create Array from Object and remove white spaces
    var arr = formMenu.textContent.split("\n").map(function(item) {
        return item.trim();
    })

    //Clean empty values
    arr = arr.filter(function(e) {
        return e
    })
    
    for (var j = 0; j < arr.length; j++) {
        Assert.matches(args[j], arr[j]);
    }
};


Selenium.prototype.doStoreRandomEmail = function(varName) {
    var strValues = "abcdefghiklmnopqrstuvwxyz0123456789";
    var stringLength = 8;
    var strEmail = "";
    var strTmp;

    for (var i = 0; i < stringLength; i++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
    }
    strTmp = "";
    strEmail = strEmail + "@";

    for (var j = 0; j < 5; j++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
    }
    strEmail = strEmail + ".com"

    storedVars[varName] = strEmail;

};
