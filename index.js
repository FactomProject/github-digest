const t = require('./templates')
const nav = require('./templates/nav')
const rpt = require('./report/monthly')
const client = require('./client')

$(document).ready(function () {
    configure(function (c) {
        runReport(
            client.Connect(c.endpoint, c.token),
            getReportParams(c)
        )
    })
})

function configure(callback) {
    $.getJSON(Config.config, null, callback)
}

function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

// prepare start/end date range
function getReportParams(config) {
    params = parseQuery(window.location.search)

    if (params.mm && params.yyyy) { // use provided yyyy & mm
        params['start_date'] = new Date(params.yyyy, params.mm - 1, 1);
        params['end_date'] = new Date(params.yyyy, params.mm, 0);
    } else {
        now = new Date();
        if (now.getDate() > 14) { // show current month when we are 2 weeks in
            delta_start = 0
            delta_end = 1
        } else {
            delta_start = -1
            delta_end = 0
        }
        params['start_date'] = new Date(now.getFullYear(), now.getMonth() + delta_start, 1)
        params['end_date'] = new Date(now.getFullYear(), now.getMonth() + delta_end, 0)
    }

    window.params = params
    return params
}

function runReport(call, params) {
    if (t[params.q]) { // if report exists
        rpt.prepare(call, params, render);
    } else {
        $('#nav-menu').html(nav({ reports: Object.keys(t) }))
        $('#app-layout').html(`<div class="container"><p>select a report to run from the menu</p></div>`);
    }
}
function render(params, data) {
    $('#app-layout').html(rpt.template({ params: params, data: data }))
}
