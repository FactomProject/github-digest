Handlebars.registerHelper('inDateRange', function(options) {
  start = options.data.root.params.start_date;
  end = options.data.root.params.end_date;

  firstValid = this.node.target.history.edges.find(function(e) {
    pushed = new Date(e.node.pushedDate);
    return (pushed > start && pushed < end);
  })

  if (firstValid) {
      return options.fn(this);
  }
});

module.exports = Handlebars.compile(`
<div class="container">
<h3> {{ params.q }} </h3>
</div>

<div class="container">
{{#each data.lsCommits.repository.refs.edges}}
    {{#inDateRange}} 
    <pre> {{ this.node.name }}
    {{#each this.node.target.history.edges}}
      {{#with this.node as |n|}}
        {{ n.pushedDate }}
          <a href="{{ n.treeUrl }}"> {{n.oid}} </a>
          {{ n.messageHeadline }}

      {{/with}}
    {{/each}}
    </pre>
    {{/inDateRange}} 

{{/each}}
</div>
`)