const q = require('../queries')
const t = require('../templates')

let useFixtures = false; // for local development w/o hammering github api

mockData = {
    branches: require('../fixtures/branches.json').data.repository.refs.edges
}

function prepare(call, params, callback) {

    console.log(params)
    data = {}

    stor = function (k, v) {
        if (!data[k]) {
            data[k] = [];
        }
        data[k] = data[k].concat(v)
    }

    if (useFixtures) {
        return callback(params, mockData)
    }

    queryBranches = function (cursor) {
        return call(q.branches(cursor)).then(function (res) {
            stor('branches', res.repository.refs.edges)
            if (res.repository.refs.pageInfo.hasNextPage){
                console.log(res.repository.refs.pageInfo)
                return queryBranches(res.repository.refs.pageInfo.endCursor)
            }
        })
    }

    Promise.all([
        queryBranches("").then( function() {
            console.log("done")
        })

    ]).then( _ => callback(params, data))
}

module.exports = {
    title: "monthly",
    prepare: prepare,
    template: t.monthly
}