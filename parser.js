var fs = require('fs');
var path = require('path');

let dirName = "/home/heipacker/StaticProjects/eos-bp-profile/bp";
fs.readdir(dirName, function (err, files) {
    files.forEach(function (filename) {
        if (filename.startsWith("$")) {
            return
        }
        let fullFileName = dirName + "/" + filename;
        var content = fs.readFileSync(fullFileName);
        var bp = JSON.parse(content);
        var zhSql = "INSERT INTO t_block_producer(`owner`, `area`, `desc`, `icon_url`, `lang`) VALUES('" + bp.account_name + "', '" + bp.introduce.cn + "', 'http://tokenbank.skyfromwell.com/tokens/icons/" + +".png', '" + "', 'zh-Hans');"
        console.log(zhSql);
        var enSql = "INSERT INTO t_block_producer(`owner`, `area`, `desc`, `icon_url`, `lang`) VALUES('" + bp.account_name + "', '" + bp.introduce.en + "', 'http://tokenbank.skyfromwell.com/tokens/icons/" + +".png', '" + "', 'en');"
        console.log(enSql);
    });
});

