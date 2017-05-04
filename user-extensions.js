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
