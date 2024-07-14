import { Button, Image } from "react-bootstrap";
import "./MenuButton.css"
import { useEffect, useState } from "react";
import { getOneTeam } from "../utils/helperFunctions";

function MenuButton(ButtonProps) {
    const [team, setTeam] = useState(null);
    const [selected, setSelected] = useState("");

    function handleClick() {
        if (selected == "home") {
            ButtonProps.setSelectedTeams({...ButtonProps.selectedTeams, homeTeam: ""})
            setSelected("")
        } else if (selected == "away") {
            ButtonProps.setSelectedTeams({...ButtonProps.selectedTeams, awayTeam: ""})
            setSelected("")
        } else {
            if (!ButtonProps.selectedTeams.homeTeam) {
                ButtonProps.setSelectedTeams({...ButtonProps.selectedTeams, homeTeam: ButtonProps.name})
                setSelected("home")
            } else if (!ButtonProps.selectedTeams.awayTeam) {
                ButtonProps.setSelectedTeams({...ButtonProps.selectedTeams, awayTeam: ButtonProps.name})
                setSelected("away")
            }
        }
    }

    useEffect(() => {
        getOneTeam(ButtonProps.name, setTeam);
    }, [ButtonProps])

    return (
        <div className="button-containter">
            {team && 
                <Button className={"team-button " + selected} 
                        style={{backgroundImage: `linear-gradient(120deg, ${team.color} 0%, #FFFFFF 100%)`}} 
                        value={team.name} 
                        onClick={handleClick}>
                    <Image className="button-logo" 
                        src={"images/"+team.name.toLowerCase().replace(/\s+/g, '-')+"-logo-transparent.png"}
                        alt={`${team.name} Logo`}
                        fluid/>
                </Button>
            }
        </div>
    )
}

export default MenuButton;