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



Selenium.prototype.doGetDataFromTable = function(locator) {
    args = locator.split("|");
    var table = this.browserbot.findElement(args[0]);
    var trs = table.rows,
        trl = trs.length,
        i = 0,
        j = 0,
        keys = [],
        obj, ret = [];
    //alert(trs);
    for (var i = 0, row; row = table.rows[i]; i++) {
        //alert("1- " + table.rows[i].rowIndex);
        if (table.rows[i].rowIndex != 0) {
            if (table.rows[i].rowIndex == 1) {
                for (var j = 1, col; col = row.cells[j]; j++) {
                    //alert("2.1- " + row.cells[j].textContent);
                    keys.push(row.cells[j].textContent);
                }
                //alert(JSON.stringify(keys));

            } else {
                obj = {};
                for (var j = 1, col; col = row.cells[j]; j++) {
                    //alert("2.1- " + row.cells[j].textContent);
                    obj[keys[j - 1]] = row.cells[j].textContent;
                }
                ret.push(obj);
            }
        }
    }
    
    storedVars[args[1]] = JSON.stringify(ret);
}


Selenium.prototype.doFillFormData = function(locator) {
    args = locator.split("|");
    var form = this.browserbot.findElement(args[0]);
    var data = JSON.parse(args[1]);

    //
    var fname = this.browserbot.findElement('name=firstName');
    var lname = this.browserbot.findElement('name=lastName');
    var username = this.browserbot.findElement('name=username');
    var email = this.browserbot.findElement('name=email');
    var pwd = this.browserbot.findElement('name=password');

    var captcha = this.browserbot.findElement('css=span#captchaOperation');
    var result = this.browserbot.findElement('name=captcha');
    var agree = this.browserbot.findElement('name=agree');

    var values = captcha.textContent.split("+");
    var sum = parseInt(values[0], 10) + parseInt(values[1], 10);
    var delayMillis = 2000; //1 second

    for (var i = data.length - 1; i >= 0; i--) {
        (function(i) {
            setTimeout(function() {
                fname.value = data[i]['First Name'];
                lname.value = data[i]['Last Name'];
                username.value = data[i]['Username'];
                email.value = data[i]['Email Address'];
                pwd.value = data[i]['Password'];

                if (data[i]['Gender'] == "Male") {
                	var checkbox = this.browserbot.findElement('xpath=(//input[@name='gender'])[1]');
                } else if (data[i]['Gender'] == "Female") {
                	var checkbox = this.browserbot.findElement('xpath=(//input[@name='gender'])[2]');
                } else {
                	var checkbox = this.browserbot.findElement('xpath=(//input[@name='gender'])[3]');
                }

                checkbox.checked = true;

                result.value = sum;
                agree.checked = true;

            }, 3000 * i);
        }(i));
    }
}


