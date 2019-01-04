let project = "factomd"
let owner = "FactomProject"

let getRepo = {
    query: `
    query repo($name: String!, $owner: String!){
        repository(name:$name, owner:$owner){
            createdAt      
        }
    } `,
    variables: {
        name: project,
        owner: owner
    }
}

let lsRepo = {
    query: `
    query repo($name: String!, $owner: String!){
        repository(name:$name, owner:$owner) {
            refs(first: 10, refPrefix: "refs/heads/") {
            edges {
                node {
                name,
                associatedPullRequests ( first: 10 ) {
                    edges {
                    node {
                        title,
                        updatedAt,
                        publishedAt,
                    }
                    }
                }
                }
            }
          }
        }
    } `,
    variables: {
        name: project,
        owner: owner
    }
}

lsCommits = {
    query: `
		query repo($name: String!, $owner: String!) {
			repository(name: $name, owner: $owner) {
				refs(last: 50, refPrefix: "refs/heads/") {
					edges {
						node {
							name
							target {
								... on Commit {
									history(first: 10) {
										edges {
											node {
												oid
												messageHeadline
												messageBody
												pushedDate
												treeUrl
												parents (first:50) {
													totalCount
													edges {
														node{
															... on Commit {
																oid
															}
														}
													}  
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		} `,
    variables: {
        name: project,
        owner: owner
    }
}

module.exports =  {
    getRepo: getRepo,
    lsRepo: lsRepo,
    lsCommits: lsCommits,
}
