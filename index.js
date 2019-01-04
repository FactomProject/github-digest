const q = require('./queries')
const t = require('./templates')
const client = require('./client')

$(document).ready(function () {
    configure(function (c) {
        fetchData(
            client.Connect(c.endpoint, c.token),
            parseQuery(window.location.search)
        )
    })
})

function configure(callback) {
    $.getJSON(Config.config, null, callback)
}

// KLUDGE: allow local development without spamming google
let useMocks = true

mocks = {
  lsCommits: require('./fixtures/lsCommits.json').data
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

function fetchData(call, params) {
    queries = []
    data = {}

    if (q[params.q]) {
        if (useMocks == true){
            render(params, mocks[params.q]);
        } else {
            call(q[params.q])
            .then(res => render(params, res));
        }
    } else {
        $('#nav-menu').html(t.nav({queries: Object.keys(q)}))
        $('#app-layout').html(`<div class="container"><p>select a report to run from the menu</p></div>`);
    }
}

function template(params, data) {
  return t[params.q]({ params: params, data: data })
}

function render(params, data) {
    $('#app-layout').html(template(params, data))
    console.log(data)
}
