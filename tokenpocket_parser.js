let fs = require('fs');
let path = require('path');

let dirName = "/home/heipacker/StaticProjects/EOS-SP-Profile/BP/bp_profile_json";
fs.readdir(dirName, function (err, files) {
    files.forEach(function (filename) {
        //sample file
        if (filename.startsWith("json_")) {
            return
        }
        let fullFileName = dirName + "/" + filename;
        let content = fs.readFileSync(fullFileName);
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
        let zhSql = "INSERT INTO t_block_producer(`title`, `owner`, `area`, `desc`, `icon_url`, `lang`) VALUES('" + bp.nickname + "', '" + bp.account_name + "', '" + bp.location.zh + "', '" + zhDesc + "', 'http://tokenpocket.gz.bcebos.com/eos-bp/" + bp.logo + "', 'zh-Hans');";
        console.log(zhSql);
        let enSql = "INSERT INTO t_block_producer(`title`, `owner`, `area`, `desc`, `icon_url`, `lang`) VALUES('" + bp.nickname + "', '" + bp.account_name + "', '" + bp.location.en + "', '" + enDesc + "', 'http://tokenpocket.gz.bcebos.com/eos-bp/" + bp.logo + "', 'en');";
        console.log(enSql);
    });
});