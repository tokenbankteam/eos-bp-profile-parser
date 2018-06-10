var fs = require('fs');
var path = require('path');

let dirName = "/home/heipacker/StaticProjects/eos-bp-profile/bp";
fs.readdir(dirName, function (err, files) {
    files.forEach(function (filename) {
        if (filename.startsWith("$")) {
            return
        }
        let fullFileName = dirName + "/" + filename;
        // console.log(fullFileName);
        var content = fs.readFileSync(fullFileName);
        // console.log(content.toString('utf8').trim());
        var bp = JSON.parse(content.toString('utf8').trim());
        var zh = bp.introduce.zh;
        if (!zh) {
            zh = "";
        }
        var en = bp.introduce.en;
        if (!en) {
            en = ""
        }
        var zhDesc = zh.replace("'", "");
        var enDesc = en.replace("'", "");
        var zhSql = "INSERT INTO t_block_producer(`title`, `owner`, `area`, `desc`, `icon_url`, `lang`) VALUES('" + bp.title + "', '" + bp.account_name + "', '" + bp.org.location + "', '" + zhDesc + "', 'http://tokenpocket.gz.bcebos.com/eos-bp/" + bp.org.branding.logo + "', 'zh-Hans');";
        console.log(zhSql);
        var enSql = "INSERT INTO t_block_producer(`title`, `owner`, `area`, `desc`, `icon_url`, `lang`) VALUES('" + bp.title + "', '" + bp.account_name + "', '" + bp.org.location + "', '" + enDesc + "', 'http://tokenpocket.gz.bcebos.com/eos-bp/" + bp.org.branding.logo + "', 'en');";
        console.log(enSql);
    });
});

