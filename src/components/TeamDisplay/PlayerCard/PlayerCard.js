import "./PlayerCard.css"

function PlayerCard({player, length, color, index}) {
    return (
                <div className="playerCard" style={{top: `${index * (35 / (length-1))}%`, 
                                                    backgroundImage: `linear-gradient(120deg, ${color} 0%, #FFFFFF 100%)`}}>
                    <div className="playerHeader" style={{backgroundColor: `${color}`}}>
                        {player.firstName[0] + ". " + player.lastName}
                    </div>
                    <div className="playerBody" style={{}}>
                        <p className="playerNumber">
                            {player.number}
                        </p>
                        <p className="playerExperience">
                            {player.exp}
                        </p>
                        <p className="playerOverall" style={{color: `${color}`}}>
                            {player.overall}
                        </p>
                        <p className="playerStatus">
                            {player.status}
                        </p>
                    </div>
                </div>
    )
}

export default PlayerCard;