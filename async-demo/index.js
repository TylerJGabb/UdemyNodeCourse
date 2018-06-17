console.log('before');




// getUser(1) //returns a resolve with a user
//     .then(user => getRepositories(user.gitHubUsername)) //on resolve, use the object passed to resolve
//     .then(repos => getCommits(repos[0])) //on resolve use the object passed to resolve
//     .then(commits => console.log('Commits',commits))
//     .catch(err => console.log(err));

async function displayCommits() {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos);
    console.log(commits);
}
displayCommits();






console.log('after');



function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('getting user')
            resolve({
                id: id,
                gitHubUsername: "John Doe"
            });
        }, 2000);
    });
}

function getRepositories(username){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Github API');
            resolve(['repo1','repo2','repo3']);
        }, 2000);
    });
}

function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting commits');
            resolve(['commit1','commit2','commit3'])
        }, 2000);
    });
}