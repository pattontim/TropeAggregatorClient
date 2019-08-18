Run the script locally with node.js: 
1. Add node-fetch import
2. comment out exports

You may find the expected input in API.txt. 

Aggregates and shows a list of movie tropes collected from allthetropes.org.

// (async() => {
//     try {
//         let ids = await idsFromTitles("The Godfather,The Shawshank Redemption,Schindler's List,Raging Bull,Casablanca")
//         console.log(ids)
//         let trope_count = await getMatches(ids)
//         console.log(trope_count)
//     } catch (e) {
//         console.log('Error occured ', e)
//     }
// })(); 
// getMatches(idsFromTitles(['Titanic', 'Juno'], tropesFromIds))