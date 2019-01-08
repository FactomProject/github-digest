let owner = "FactomProject"
let project = "factomd"

let repo = {
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

let branchQuery  = `
    query($name: String!, $owner: String!, $branchCursor: String!) {
        repository(name: $name, owner: $owner) {
        refs(first: 100, refPrefix: "refs/heads/", after: $branchCursor ) {
            edges {
            node {
                name
                target {
                ... on Commit {
                    pushedDate
                    oid
                    history(first:10) {
                    nodes {
                        oid,
                        messageHeadline,
                        messageBody,
                        pushedDate,
                        treeUrl,
                        parents(first: 10) {
                        nodes {
                            oid
                        }
                        
                        }
                    }
                    }
                }
                }
            }
            }
            pageInfo {
            endCursor
            startCursor
            hasNextPage
            }
        }
        }
    } `;

function branches (cursor) {
    console.log(cursor)
    return {
        query: branchQuery,
        variables: {
            name: project,
            owner: owner,
            branchCursor: cursor
        }
    }
}

module.exports =  {
    repo: repo,
    branches: branches,
}
