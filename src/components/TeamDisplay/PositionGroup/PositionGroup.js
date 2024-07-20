import { Col } from "react-bootstrap";
import PlayerCard from "../PlayerCard/PlayerCard";
import "./PositionGroup.css"
import { useContext, useEffect, useState } from "react";
import { MaddenRatingsContext, TeamContext } from "../../../App";
import { RotatingLines } from "react-loader-spinner";
import { athleteEndpoints } from "../../../constants/constants";

function PostitionGroup({ label, athletes }) {
    const ratings = useContext(MaddenRatingsContext);
    const team = useContext(TeamContext);

    const [playerData, setPlayerData] = useState([])
    useEffect(() => {
        getAllPlayerData();
    }, [athletes])

    async function getPlayerData(id) {
        const url = athleteEndpoints + id;
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            return ({
                firstName: json["athlete"]["firstName"],
                 lastName: json["athlete"]["lastName"],
                 fullName:  json["athlete"]["displayName"],
                      exp: json["athlete"]["displayExperience"] == "Rookie" ? "Rk" : json["athlete"]["displayExperience"].split(" ")[0],
                   status: json["athlete"]["injuries"] ? json["athlete"]["injuries"][0]["type"]["abbreviation"] : null,
                   number: json["athlete"]["jersey"] ? `#${json["athlete"]["jersey"]}` : 'NA',
                 headshot: json["athlete"]["headshot"] ? json["athlete"]["headshot"]["href"] : null
            })
        } catch (error) {
            console.error(`Could not get data for player id: ${id}`, error.message);
        }
    }

    async function getAllPlayerData() {
        var players = []
        for (var player of athletes) {
            players.push(await getPlayerData(player.id));
        }
        setPlayerData(players);
    }

    function findMaddenRating(name) {
        var player = ratings.find((player) => player["name"] === name)
        if (player) {
            return player["overall"];   
        } 
        return "NA";
    }
    
    return (
        <Col xs={1} className="position-column d-flex align-items-center flex-column">
            <h1 className="group-label">{label.toUpperCase()}</h1>
            {team && ratings && (playerData.length == athletes.length) ?
                <div className="player-cards-div">
                    {playerData.map((player, key) =>
                        (<PlayerCard player={{...player, overall: findMaddenRating(player.fullName)}} ratings={ratings} length={athletes.length} color={team.color} index={key} key={key}/>)
                    )}
                </div>
            :
                <div className="player-cards-div">
                    <RotatingLines visible={true}
                                width="60%"
                                strokeColor="white"
                                ariaLabel="rotating-lines-loading"/>
                </div>
            }
        </Col>
    )
}

export default PostitionGroup;