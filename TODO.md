Thu Jan  3 16:39:58 CST 2019

WIP
---

build static site for reporting on github activity

BACKLOG
-------
* template HTML using handlebar templates + jquery
* add query params
* finish queries for getting a range of data by data for 1 mo
* filter on FD branches that have a head commit in the target range

* STRETCH: add methods for checking for --merged to evaluate 
  * seems to be a recursive call

REVIEW
------

* Should we store graphsql source in blah.graphql files?
  * https://www.npmjs.com/package/graphql-import
  * https://github.com/SevenOutman/GitHub-in-RSUITE/blob/develop/src/views/repo/tree/index.graphql

* Replicate Clay's usage:

I think this can be done by recursively searching branch parents

```
1793  git branch -a --merged origin/FD-706_release_candidate_6.0.2_dev  | grep -Eo "FD-[0-9]+" | sort -u -n -k1.3
1785  git branch -a | grep -Eo "FD-7[456789][0-9].*" | sort -r
```

