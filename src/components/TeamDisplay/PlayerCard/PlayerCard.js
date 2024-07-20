import { useState } from "react";
import { playerCardHeight } from "../../../constants/constants";
import PlayerPopUp from "../PlayerPopUp/PlayerPopUp";
import "./PlayerCard.css"
import { Col, Row } from "react-bootstrap";

function PlayerCard({player, length, color, index}) {
    const [showPopUp, setShowPopUp] = useState(false);
    const handleClick = () => setShowPopUp(true);
    return (
        <>
            <PlayerPopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp} player={player} color={color}/>
            <div className="playerCard" onClick={handleClick} style={{top: `${index * (playerCardHeight / (length-1))}%`, 
                                                backgroundImage: `linear-gradient(120deg, ${color} 0%, #FFFFFF 100%)`}}>
                <header className="d-flex justify-content-center playerHeader" style={{backgroundColor: `${color}`}}>    
                    <Col className="playerNumber">
                        {player.number}
                    </Col>
                    <Col className="playerTitle" xs={10}>
                        {player.firstName[0] + ". " + player.lastName}
                    </Col>
                    <Col className="playerStatus" >
                        {player.statusAbbr}
                    </Col>
                </header>
                <section className="playerBody" style={{backgroundImage: `url(${player.headshot})`}}>
                    <p className="playerExperience">
                        {player.exp == "Rookie" ? "Rk" : player.exp.split(" ")[0]}
                    </p>
                    <p className="playerOverall" style={{color: `${color}`}}>
                        {player.overall}
                    </p>
                </section>
            </div>
        </>
    )
}

export default PlayerCard;