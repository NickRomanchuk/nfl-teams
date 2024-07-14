import { Col } from "react-bootstrap";
import PlayerCard from "../PlayerCard/PlayerCard";
import "./PositionGroup.css"

function PostitionGroup(props) {
    return (
        <Col xs={1} className="position-column d-flex align-items-center flex-column">
            <h1 className="group-label">{props.label.toUpperCase()}</h1>
            <div className="player-cards-div">
                {props.athletes.map((player, key)=>
                    (
                        <PlayerCard playerId={player.id} index={key} length={props.athletes.length} key={key}/>
                    )
                )}
            </div>
        </Col>
    )
}

export default PostitionGroup;