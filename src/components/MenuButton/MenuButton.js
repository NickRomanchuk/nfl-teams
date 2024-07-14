import { Button, Image } from "react-bootstrap";
import "./MenuButton.css"
import { useState } from "react";

function MenuButton(ButtonProps) {
    const [selected, setSelected] = useState("");

    function handleClick() {
        
        if (selected == "home") {
            ButtonProps.setSelectedTeams({...ButtonProps.selectedTeams, homeTeam: null})
            setSelected("")
        } else if (selected == "away") {
            ButtonProps.setSelectedTeams({...ButtonProps.selectedTeams, awayTeam: null})
            setSelected("")
        } else {
            if (!ButtonProps.selectedTeams.homeTeam) {
                ButtonProps.setSelectedTeams({...ButtonProps.selectedTeams, homeTeam: ButtonProps.team})
                setSelected("home")
            } else if (!ButtonProps.selectedTeams.awayTeam) {
                ButtonProps.setSelectedTeams({...ButtonProps.selectedTeams, awayTeam: ButtonProps.team})
                setSelected("away")
            }
        }
    }

    return (
        <div className="button-containter">
            <Button className={"team-button " + selected} 
                    style={{backgroundImage: `linear-gradient(120deg, ${ButtonProps.team.color} 0%, #FFFFFF 100%)`}} 
                    value={ButtonProps.team.name} 
                    onClick={handleClick}>
                <Image className="button-logo" 
                    src={"images/"+ButtonProps.team.name.toLowerCase().replace(/\s+/g, '-')+"-logo-transparent.png"}
                    alt={`${ButtonProps.team.name} Logo`}
                    fluid/>
            </Button>
        </div>
    )
}

export default MenuButton;