let Eos = require('eosjs');
let Axios = require('axios');
let Async = require('async');

let eos = Eos({
    chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
    keyProvider: '5KgSVdBvKJM7cq1bN91PUnfCREieZ4duqsMuyNWM6zUewhJpKm2',
    httpEndpoint: 'http://api2.eos.ren:8883'
});
eos.getProducers({json: true, lower_bound: '', limit: 500}).then(function (bpRes) {
    let rows = bpRes.rows;
    if (!(rows != null || rows.length !== 0)) {
        return;
    }
    let funs = [];
    for (let i = 0; i < rows.length; ++i) {
        let accountName = rows[i].owner;
        let website = rows[i].url;
        if (!website.endsWith(".json")) {
            if (website.endsWith("/")) {
                website += "bp.json";
            } else {
                website += "/bp.json";
            }
        }
        console.log(accountName + " " + website);

        function f(website) {
            funs.push(function (callback) {
                Axios.get(website).then(function (response) {
                    callback(null, response.data);
                }).catch(function (error) {
                    if (error.response.status === 404) {

                    }
                    console.log(error);
                    callback(null, {});
                });
            });
        }

        f(website)
    }
    Async.parallelLimit(funs, 3, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results)
    });
});

