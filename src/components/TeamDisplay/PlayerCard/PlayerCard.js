import { useState } from "react";
import { playerCardHeight } from "../../../constants/constants";
import PlayerPopUp from "../PlayerPopUp/PlayerPopUp";
import "./PlayerCard.css"

function PlayerCard({player, length, color, index}) {
    const [showPopUp, setShowPopUp] = useState(false);
    const handleClick = () => setShowPopUp(true);
    return (
        <>
            <PlayerPopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp} player={player} color={color}/>
            <div className="playerCard" onClick={handleClick} style={{top: `${index * (playerCardHeight / (length-1))}%`, 
                                                backgroundImage: `linear-gradient(120deg, ${color} 0%, #FFFFFF 100%)`}}>
                <header className="playerHeader" style={{backgroundColor: `${color}`}}>
                    {player.firstName[0] + ". " + player.lastName}
                </header>
                <section className="playerBody" style={{backgroundImage: `url(${player.headshot})`}}>
                    <p className="playerNumber">
                        {player.number}
                    </p>
                    <p className="playerExperience">
                        {player.exp == "Rookie" ? "Rk" : player.exp.split(" ")[0]}
                    </p>
                    <p className="playerOverall" style={{color: `${color}`}}>
                        {player.overall}
                    </p>
                    <p className="playerStatus">
                        {player.statusAbbr}
                    </p>
                </section>
            </div>
        </>
    )
}

export default PlayerCard;