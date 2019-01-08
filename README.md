# github-digest

Report Factomd activity on github
http://factomstatus.com/github-digest/

Build a URL to specify a particular month
```
http://factomstatus.com/github-digest/?q=monthly&mm=12&yyyy=2018
```
Here we specify Dec 2018.

NOTE: that because of the way the data is pulled from github - this takes a while to load.

## Development

install node modules - will also generate a new browserify `bundle.js`

```
npm install
```

run dev server - watches files for changes and auto-reloads.
```
npm run dev
```
