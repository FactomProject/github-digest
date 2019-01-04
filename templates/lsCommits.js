module.exports = Handlebars.compile(`
<div class="container">
<h3> {{ params.q }} </h3>
</div>

<div class="container">
{{#each data.repository.ref.target.history.edges}}
  {{#with this.node as |n| }}
<pre>
{{ n.author.date }}: {{ n.messageHeadline }}
</pre>

  {{/with}}
{{/each}}
</div>
`)
