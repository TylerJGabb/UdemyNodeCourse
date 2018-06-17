
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        resolve(1);
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000);
});

//resolves/rejects as soon as any of the promises are resolved/rejected
Promise.race([p1, p2])
    .then(result => console.log(result));


//resolves when ALL of the promisess has resolved. If any of them reject, it only rejects
Promise.all([p1,p2])
    .then(result => console.log(result));