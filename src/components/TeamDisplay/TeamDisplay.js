import { ButtonGroup, Col, Image, Row, ToggleButton } from "react-bootstrap";
import "./TeamDisplay.css"
import { useContext, useEffect, useState } from "react";
import { depthChartsEndpoints, teamUnitsRadios } from "../../constants/constants";
import DepthChart from "./DepthChart/DepthChart";
import { TeamContext } from "../../App";

function TeamDisplay({ home }) {
    const team = useContext(TeamContext);

    const [roster, setRoster] = useState(null);
    const [offDef, setOffDef] = useState("");
    useEffect(()=>{
        if (team) {
            getDepthChart()
            setOffDef("Offense")
        } else {
            setRoster(null)
            setOffDef("")
        }
    }, [team])
    
    async function getDepthChart() {
        const url = depthChartsEndpoints[0] + team.espnID + depthChartsEndpoints[1];
        try {
            const response = await fetch(url);
            const json = await response.json();
            setRoster(json.depthchart)
        } catch (error) {
            console.error(`Could not get depth chart from ESPN`, error.message);
        }
    }
         
    return (
        <Row className = "display" style = {home ? {backgroundPosition: "center top"} : {backgroundPosition: "center bottom"}}>
                <Col xs={2} md={1} className="logo-col">
                    {team &&
                        <Image className="team-logo"
                               src={"images/"+team.name.toLowerCase().replace(/\s+/g, '-')+"-logo-transparent.png"}
                               alt={`${team.name} logo`} />
                    }
                </Col>
                {roster && <DepthChart isOff={offDef == "Offense"} roster={roster[offDef == "Offense" ? "2" : 0]["positions"]}/>}
                <Col className="toggle d-flex justify-content-end flex-column" xs={1}>
                    {team &&
                        <ButtonGroup className="off-def-buttons">
                            {teamUnitsRadios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    className={offDef === radio.value ? "off-def checked" : "off-def"}
                                    id={home ? `radio-${idx}-home` : `radio-${idx}`}
                                    type="radio"
                                    value={radio.value}
                                    onChange={(e) => setOffDef(e.currentTarget.value)}
                                    style={{backgroundColor: team.color}}
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