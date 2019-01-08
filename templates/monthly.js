Handlebars.registerHelper('inDateRange', function(options) {
  start = options.data.root.params.start_date;
  end = options.data.root.params.end_date;

  firstValid = this.node.target.history.nodes.find(function(n) {
    pushed = new Date(n.pushedDate);
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
{{#each data.branches}}
    {{#inDateRange}} 
    <pre> {{ this.node.name }}
    {{#each this.node.target.history.nodes}}
      {{ this.pushedDate }}
        <a href="{{ this.treeUrl }}"> {{this.oid}} </a>
      {{ this.messageHeadline }}
    {{/each}}
    </pre>
    {{/inDateRange}} 

{{/each}}
</div>
`)