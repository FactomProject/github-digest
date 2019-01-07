let project = "factomd"
let owner = "FactomProject"

let getRepo = {
    query: `
    query($name: String!, $owner: String!){
        repository(name:$name, owner:$owner){
            createdAt      
        }
    } `,
    variables: {
        name: project,
        owner: owner
    }
}

lsCommits = {
    query: `
		query($name: String!, $owner: String!, $cursor: String!) {
			repository(name: $name, owner: $owner) {
				refs(last: 100, refPrefix: "refs/heads/", after: $cursor) {
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
        owner: owner,
        cursor: ""
    }
}

module.exports =  {
    getRepo: getRepo,
    lsCommits: lsCommits,
}
