Mon Jan  7 10:26:38 CST 2019

WIP
---

build static site for reporting on github activity

BACKLOG
-------
-[ ] query full list of branches ( figure out how to paginate or use cursor to get more than 100)
-[ ] filter list of all FD branches that have a head commit in the target timeperiod
-[ ] pull top 'n' commits for each FD-* branch
-[ ] show tags and potential release branches 
-[ ] show commits for each branch in target set
-[ ] show related PR's 
-[ ] show issues opened closed/comments during target period

DONE
----
-[x] add query params
-[x] template HTML using handlebar templates + jquery

ICEBOX
-------
-[ ] queries for getting a range of data by data for 1 mo - couldn't figure out how to filter inside 1 query
-[ ] STRETCH GOAL: Construct feature matrix showing each FD branch merger into releases, rc branchs and tags
- [ ] be able to query for branch membership - does this head commit of FD-.* exist on branch 'x' ?

REVIEW
------
* Replicate Clay's usage:

I think this can be done by recursively searching branch parents
Basically this is about finding a given head commit in each target branch.

```
1793  git branch -a --merged origin/FD-706_release_candidate_6.0.2_dev  | grep -Eo "FD-[0-9]+" | sort -u -n -k1.3
1785  git branch -a | grep -Eo "FD-7[456789][0-9].*" | sort -r
```
