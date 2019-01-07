const q = require('../queries')
const t = require('../templates')

let useFixtures = true; // for local development w/o hammering github api

mockData = {
    lsCommits: require('../fixtures/lsCommits.json').data
}

function prepare(call, params, callback) {

    console.log(params)
    data = {}

    if (useFixtures) {
        callback(params, mockData)
    } else {
        call(q.lsCommits).then( res => callback(params, {"lsCommits": res }) )
        /*
        FIXME: use params to gather and filter data
        Promise.all(
            call(q.lsCommits
        )
        */
    }

    console.log(data)
    return data
}

module.exports = {
    title: "monthly",
    prepare: prepare,
    template: t.monthly
}