
const p = new Promise((resolve, reject) => {
    //do some async work
    //...
    setTimeout(() => {
        //resolve(1);
        reject();
    }, 2000);

    //send result to consumers of promise
    //if something went wrong
    //reject(new Error('Message'));
});

p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error Message', err.message));