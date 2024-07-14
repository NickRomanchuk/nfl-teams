import { TeamContext } from "../../../App";
import { RatingsContext } from "../DepthChart/DepthChart";
import "./PlayerCard.css"
import { useContext, useEffect, useState } from "react";

function PlayerCard(props) {
    const ratings = useContext(RatingsContext);
    const team = useContext(TeamContext);
    const [playerData, setPlayerData] = useState(null)

    async function getPlayerData() {
        const url = await `https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/${props.playerId}`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            json.overall = ratings.find((player) => player["name"] === json["athlete"]["displayName"])
            if (json["athlete"]["displayExperience"] == "Rookie") {
                json["athlete"]["displayExperience"] = "Rk"
            } else {
                json["athlete"]["displayExperience"] = json["athlete"]["displayExperience"].split(" ")[0]
            }
            //console.log(json)
            setPlayerData(json)
        } catch (error) {
            console.error(error.message);
        }
    }


    useEffect(() => {
        if (props.playerId) {
            getPlayerData();
        }
    }, [props])

    return (
        <>
            {playerData && team && ratings &&
                <div className="playerCard" style={{top: `${props.index * (35 / (props.length-1))}%`, 
                                                    backgroundImage: `linear-gradient(120deg, ${team.color} 0%, #FFFFFF 100%)`}}>
                    <div className="playerHeader" style={{backgroundColor: `${team.color}`}}>
                        {playerData["athlete"]["firstName"][0] + ". " + playerData["athlete"]["lastName"]}
                    </div>
                    <div className="playerBody" style={{backgroundImage: `url(${Object.hasOwn(playerData["athlete"], "headshot") ? playerData["athlete"]["headshot"]["href"] : null})`}}>
                        <p className="playerNumber">
                            {playerData["athlete"]["jersey"] ? `#${playerData["athlete"]["jersey"]}` : 'NA'}
                        </p>
                        <p className="playerExperience">
                            {playerData["athlete"]["displayExperience"]}
                        </p>
                        <p className="playerOverall" style={{color: `${team.color}`}}>
                            {playerData["overall"] ? playerData["overall"]["overall"] : "NA"}
                        </p>
                        <p className="playerStatus">
                            {playerData["athlete"]["injuries"] ? playerData["athlete"]["injuries"][0]["type"]["abbreviation"] : ""}
                        </p>
                    </div>
                </div>
            }
        </>
    )
}

export default PlayerCard;