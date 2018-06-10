let fs = require('fs');
let path = require('path');

let dirName = "/home/heipacker/StaticProjects/eos-bp-profile/bp";
fs.readdir(dirName, function (err, files) {
    files.forEach(function (filename) {
        if (filename.startsWith("$")) {
            return
        }
        let fullFileName = dirName + "/" + filename;
        // console.log(fullFileName);
        let content = fs.readFileSync(fullFileName);
        // console.log(content.toString('utf8').trim());
        let bp = JSON.parse(content.toString('utf8').trim());
        let zh = bp.introduce.zh;
        if (!zh) {
            zh = "";
        }
        let en = bp.introduce.en;
        if (!en) {
            en = ""
        }
        let zhDesc = zh.replace("'", "");
        let enDesc = en.replace("'", "");
        let zhSql = "INSERT INTO t_block_producer(`title`, `owner`, `area`, `desc`, `icon_url`, `lang`) VALUES('" + bp.title + "', '" + bp.account_name + "', '" + bp.org.location + "', '" + zhDesc + "', 'http://tokenpocket.gz.bcebos.com/eos-bp/" + bp.org.branding.logo + "', 'zh-Hans');";
        console.log(zhSql);
        let enSql = "INSERT INTO t_block_producer(`title`, `owner`, `area`, `desc`, `icon_url`, `lang`) VALUES('" + bp.title + "', '" + bp.account_name + "', '" + bp.org.location + "', '" + enDesc + "', 'http://tokenpocket.gz.bcebos.com/eos-bp/" + bp.org.branding.logo + "', 'en');";
        console.log(enSql);
    });
});