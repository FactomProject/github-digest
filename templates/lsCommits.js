module.exports = Handlebars.compile(`
<div class="container">
<h3> {{ params.q }} </h3>
</div>

<div class="container">
{{#each data.repository.refs.edges}}

    <pre> {{ this.node.name }}
    {{#each this.node.target.history.edges}}
      {{#with this.node as |n|}}
        {{ n.pushedDate }}
          <a href="{{ n.treeUrl }}"> {{n.oid}} </a>
          {{ n.messageHeadline }}

      {{/with}}
    {{/each}}
    </pre>

{{/each}}
</div>
`)
/*
  {{#each this.edges }}

  <pre>
  {{ n.author.date }}: {{ n.messageHeadline }}
  </pre>
    
  {{/each}}
  */
