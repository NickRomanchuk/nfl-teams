import { Button, Image } from "react-bootstrap";
import "./MenuButton.css"
import { useState } from "react";

function MenuButton({teamData, selectedTeams, setSelectedTeams}) {
    const [selected, setSelected] = useState("");

    function handleClick() {
        if (selected == "home") {
            setSelectedTeams({...selectedTeams, homeTeam: null})
            setSelected("")
        } else if (selected == "away") {
            setSelectedTeams({...selectedTeams, awayTeam: null})
            setSelected("")
        } else {
            if (!selectedTeams.homeTeam) {
                setSelectedTeams({...selectedTeams, homeTeam: teamData})
                setSelected("home")
            } else if (!selectedTeams.awayTeam) {
                setSelectedTeams({...selectedTeams, awayTeam: teamData})
                setSelected("away")
            }
        }
    }

    return (
        <div className="button-containter">
            <Button className={"team-button " + selected} 
                    style={{backgroundImage: `linear-gradient(120deg, ${teamData.color} 0%, #FFFFFF 100%)`}} 
                    value={teamData.name} 
                    onClick={handleClick}>
                <Image className="button-logo" 
                    src={"images/"+teamData.name.toLowerCase().replace(/\s+/g, '-')+"-logo-transparent.png"}
                    alt={`${teamData.name} Logo`}
                    fluid/>
            </Button>
        </div>
    )
}

export default MenuButton;