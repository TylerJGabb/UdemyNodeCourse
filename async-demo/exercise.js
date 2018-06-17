
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function sendEmailSync(customerId){
  const customer = await getCustomer(customerId);
  console.log('Customer', customer);
  if(customer.isGold){
    const top10Movies = await getTopMovies();
    console.log('Top 10 movies',top10Movies);
    await sendEmail(customer.email, top10Movies);
    console.log('email sent');
  }
}
sendEmailSync();


function getCustomer(id) {
  return new Promise((resolve, reject) =>{
    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);  
  });

}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  });
}