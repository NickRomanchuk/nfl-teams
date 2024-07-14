function processMaddenData(data) {
    var players = []
    var newPlayer = {}
    for (var player of data) {
        newPlayer.name  = player.fullNameForSearch
        newPlayer.overall = player.overall_rating
        newPlayer.position = player.position
        newPlayer.team = player.team
        newPlayer.age = player.age
        newPlayer.height = player.height
        newPlayer.weight = player.weight
        newPlayer.number = player.jerseyNum
        newPlayer.years = player.yearsPro
        newPlayer.college = player.college
        players.push(newPlayer)
    }
    return players
}

async function accessMaddenAPI(endPoint) {
    return fetch(endPoint).then((response) => {
                return response.json().then((data) => {
                    return processMaddenData(data.docs)
                })
            })
}

async function getData() {
    var players = await accessMaddenAPI("https://ratings-api.ea.com/v2/entities/m24-ratings?limit=1000")
    players = await players.concat(accessMaddenAPI("https://ratings-api.ea.com/v2/entities/m24-ratings?limit=1000"))
    return players
}

x = getData()
console.log(x)
