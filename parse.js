
// const fetch = require("node-fetch");
// returns a key and value pair
// function getTropes(title){
//     // perform requests with title
//     let request = new Request('https://allthetropes.fandom.com/api/v1/Articles/Details?titles=title')

//     data = undefined

//     if(Object.keys(data.items)[0] == undefined){
//         return
//     }
//     id = Number.parseInt(Object.keys(data.items)[0])
//     return getTropesById(id)
// }

async function idsFromTitles(title_string){
    // convert title array to CSV

    // FIXME convert to arary
    let csv_titles = title_string
    // now, throw away our csv titles and make a dict with each item's id as key and title as value.
    return fetch("https://allthetropes.fandom.com/api/v1/Articles/Details?titles=" + csv_titles)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // console.log(JSON.stringify(myJson));
        
        let pairs = {}
        // if(Object.keys(data.items)[0] == undefined){
            //         return
            // }
        for (const key in data.items){
            if (data.items.hasOwnProperty(key)) {
                const title = data.items[key];
                pairs[key] = title.title
            }
        }
        // callback(pairs)
        return pairs
    });

    // alternative, use the result of IDs from titles.
    // id = Number.parseInt(Object.keys(data.items)[0])
}


async function getTropesById(id, callback){
    // let request = new Request('https://allthetropes.fandom.com/api/v1/Articles/AsSimpleJson?id=' + 
    let request = "https://allthetropes.fandom.com/api/v1/Articles/AsSimpleJson?id=" + id

    let data = undefined

    return fetch(request, {mode:'no-cors'})
        .then(response => response.json())
        .then(data => {
            // if (response.status === 200) {
                // response.json().then(data => {
// 
                // });
                let trope_group = []
                for (const section of data.sections) {
                // trope_group[data.sections[0].title] = []
                    section.content.forEach(content => {
                        if(content.type == 'list'){
                            // console.log(content.elements)
                            content.elements.forEach(trope_text => {
                                let re = new RegExp('(^.+?):(?:.+)|(.+)', 'gm')
                                let match = re.exec(trope_text.text)
                                // console.log(trope_text.text.match(re))
                                if(match != null){
                                    // console.log(match.length);
                                    // if(match.length == 1)
                                    if(match[1] != undefined){
                                        if(match[0].length < match[1].length)
                                            // console.log(match[0].replace(':', ''))
                                            // tropes.push(match[0].replace(':', ''))
                                            trope_group.push(match[0].replace(':', ''))
                                            // trope_group.tropes.push(match[0].replace(':', ''))
                                        else
                                            // console.log(match[1].replace(':', ''))
                                            trope_group.push(match[1].replace(':', ''))
                                    } else {
                                        // console.log(match[0].replace(':',''));
                                        trope_group.push(match[0].replace(':',''))
                                    }
                                                                    // else if(match.length == 2)
                                }
                            });
                            // extract the tropes!
                            // match a regex and filter out info. Always get start of 'text' field and go until either : or end of line that is also end of string
                            // content.elements.forEach()
                        }
                    });
                }

                // trope group is defined by ID
                // if (Object.keys(trope_group).length == 0) {
                //     for (const section of data.sections) {
                //         if
                //     }
                // }

                return trope_group
            // } else {
                // throw new Error('Something went wrong on api server!');
            // }
        });
    }

async function tropesFromIds(id_title_pairs){
    let accumulated = {}
    // create a dictionary with title as key and an array of tropes as value
    // id_title_pair.forEach(pair => {
    //     // accumulated.push(getTropes(element))
    //     // tropes = getTropes(element)
    //     // look into dict construction in JS.
    //     accumulated[pair.] = getTropes(element)
    // });
    for (const key in id_title_pairs) {
        if (id_title_pairs.hasOwnProperty(key)) {
            const title = id_title_pairs[key];
            console.log("id: ", key)
            accumulated[title] = await getTropesById(key)
        }
    }
    return accumulated
}

// Returns the 
async function getMatches(titles){
    let trope_dict = await tropesFromIds(titles)
    let trope_counter = {}

    // use an array with 
    for (const title in trope_dict) {
        if (trope_dict.hasOwnProperty(title)) {
            const tropes_for_title = trope_dict[title];
            tropes_for_title.forEach(trope => {
                if(trope_counter[trope] != undefined){
                    trope_counter[trope] += 1
                } else {
                    trope_counter[trope] = 1
                }
            });
        }
    }

    // trope_dict.forEach(title_pair => {
    //     // iterate over dict properties...
    //     for (const key in title_pair) {
    //         if (trope_dict.hasOwnProperty(key)) {
    //             const tropes_for_title = trope_dict[key];
    //             // console.log(element);
    //             tropes_for_title.forEach(trope => {
    //                 // increment dictionary at trope value
    //                 if(trope_counter[trope] != undefined){
    //                     trope_counter[trope] += 1
    //                 } else {
    //                     trope_counter[trope] = 0
    //                 }
    //             });
    //         }
    //     }
    // });
    return trope_counter
    
    
    // for each tropedict entry,
        // increment dictionary entry with the trope as the key (literally as key)
}

// for each TROPE (with trope as key), have a list of movie titles that contain that trope
// how would it fit in for other features, like
// movies which appear most: easy
// // movies which appear sometimes: ;
// (async() => {
//     try {
//         let ids = await idsFromTitles(["Titanic", "ICarly"])
//         console.log(ids)
//         let trope_count = await getMatches(ids)
//         console.log(trope_count)
//         // matches = getMatches(ids)
//     } catch (e) {
//         console.log('Error occured ', e)
//     }
// })(); 
    
export const getMatches_f = getMatches;
export const idsFromTitles_f = idsFromTitles;

// getMatches(idsFromTitles(['Titanic', 'Juno'], tropesFromIds))