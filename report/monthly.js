const q = require('../queries')
const t = require('../templates')

let useFixtures = false; // for local development w/o hammering github api

mockData = {
    lsCommits: require('../fixtures/lsCommits.json').data
}

function prepare(call, params, callback) {

    console.log(params)
    data = {}

    stor = function (k, v) {
        data[k] = v
    }

    if (useFixtures) {
        callback(params, mockData)
    } else {
        //FIXME: use params to gather and filter all data needed
        // should support cursors
        Promise.all([
            call(q.lsCommits).then(res => stor('lsCommits', res))
        ]).then( res => callback(params, data) )
    }

    console.log(data)
    return data
}

module.exports = {
    title: "monthly",
    prepare: prepare,
    template: t.monthly
}