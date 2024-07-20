import { playerCardHeight } from "../../../constants/constants";
import "./PlayerCard.css"

function PlayerCard({player, length, color, index}) {
    return (
        <div className="playerCard" style={{top: `${index * (playerCardHeight / (length-1))}%`, 
                                            backgroundImage: `linear-gradient(120deg, ${color} 0%, #FFFFFF 100%)`}}>
            <header className="playerHeader" style={{backgroundColor: `${color}`}}>
                {player.firstName[0] + ". " + player.lastName}
            </header>
            <section className="playerBody" style={{backgroundImage: `url(${player.headshot})`}}>
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
            </section>
         </div>
    )
}

export default PlayerCard;