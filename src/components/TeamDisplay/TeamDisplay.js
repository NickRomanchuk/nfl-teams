import { ButtonGroup, Col, Image, Row, ToggleButton } from "react-bootstrap";
import "./TeamDisplay.css"
import { useContext, useEffect, useState } from "react";
import { TeamContext } from "../../App";
import { teamUnitsRadios } from "../../constants/constants";
import { getOneTeam } from "../utils/helperFunctions";
import DepthChart from "./DepthChart/DepthChart";

function TeamDisplay(props) {
    const teamName = useContext(TeamContext);
    const [team, setTeam] = useState(null);
    const [offDef, setOffDef] = useState("")
    const [roster, setRoster] = useState(null)

    async function getDepthChart() {
        if (team) {
            const url = await `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team.espnID}/depthcharts`;
            try {
              const response = await fetch(url);
              const json = await response.json();
              //console.log(json);
              setRoster(json.depthchart)
            } catch (error) {
              console.error(error.message);
            }
        }
    }

    useEffect(()=>{
        if (teamName) {
            getOneTeam(teamName, setTeam);
            setOffDef("Offense")
        } else {
            setOffDef("")
            setRoster(null)
            setTeam(null)
        }
    }, [teamName])
    
    useEffect(()=>{
        getDepthChart();
    }, [team])
         
    return (
        <Row className = "display"
             style = {props.home ? {backgroundPosition: "center top"} : {backgroundPosition: "center bottom"}}>

                <Col xs={2} md={1} className="logo-col">
                    {team && <Image className="team-logo"
                                        src={"images/"+teamName.toLowerCase().replace(/\s+/g, '-')+"-logo-transparent.png"}
                                        alt={`${teamName} logo`} />}
                </Col>

                {roster && 
                    <DepthChart isOff={offDef == "Offense"} roster={roster[offDef == "Offense" ? "2" : 0]["positions"]}/>}

                <Col className="toggle d-flex justify-content-end flex-column" xs={1}>
                    {team &&
                        <ButtonGroup className="off-def-buttons">
                            {teamUnitsRadios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    className={offDef === radio.value ? "off-def checked" : "off-def"}
                                    id={props.home ? `radio-${idx}-home` : `radio-${idx}`}
                                    type="radio"
                                    value={radio.value}
                                    onChange={(e) => setOffDef(e.currentTarget.value)}
                                    style={{backgroundColor : team.color}}
                                    >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    }
                </Col>
            </Row>
    )
}

export default TeamDisplay;