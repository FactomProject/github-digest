module.exports = Handlebars.compile(`
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        {{#each reports}}
        <li><a href="?q={{this}}">{{this}}</a></li>
        {{/each}}
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <a href="https://github.com/FactomProject/github-digest" target="_blank">
          <span class="fa fa-github"></span> code 
          </a>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
`)
