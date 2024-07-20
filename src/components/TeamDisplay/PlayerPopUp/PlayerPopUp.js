import { Col, Image, Modal, Row, Table } from "react-bootstrap";
import "./PlayerPopUp.css"

function PlayerPopUp( {showPopUp, setShowPopUp, player, color} ) {
    const handleClose = () => setShowPopUp(false);

    return (
        <Modal className="playerModal" show={showPopUp} onHide={handleClose} animation={false} centered>
            <Modal.Header className="playerPopHeader" style={{backgroundColor: `${color}`}}>
                <Col xs={2}>
                    <Image className="playerHeadshot"
                                src={player.headshot}
                                alt={`${player.fullName} headshot`} />    
                </Col>
                <Col className="titleCol">
                    <Row className="numberRow row">
                        {player.position + " " + player.number}
                    </Row>
                    <Row className="nameRow row">
                        {player.firstName.toUpperCase()}
                    </Row>
                    <Row className="nameRow row">
                        {player.lastName.toUpperCase()}
                    </Row>
                </Col>
                <Col xs={2} className="overallCol">
                    <div className="overallContainer">
                        <Row className="overallRow row">
                            {player.overall}
                        </Row>
                        <Row className="textRow row">
                            OVR
                        </Row>
                    </div>
                </Col>    
            </Modal.Header>
            <Modal.Body className="playerPopBody" style={{backgroundImage: `linear-gradient(35deg, ${color} -20%, #FFFFFF 90%)`}}>
                <Row className="row">
                    <h2 className="titleCol">
                        PLAYER PROFILE
                    </h2>
                    <section className="profileSection" style={{backgroundColor: `${color}`}}>
                        <Row className="row">
                            <Col className="profileCol">
                                <Row className="row"><Col className="profileLabel">{"HEIGHT: "}</Col> <Col className="profileData">{player.height}</Col></Row>
                                <Row className="row"><Col className="profileLabel">{"WEIGHT: "}</Col> <Col className="profileData">{player.weight}</Col></Row>
                                <Row className="row"><Col className="profileLabel">{"AGE: "}</Col> <Col className="profileData">{player.age + " years"}</Col></Row>
                            </Col>
                            <Col className="profileCol">
                                <Row className="row"><Col className="profileLabel">{"EXPERIENCE: "}</Col> <Col className="profileData">{player.exp}</Col></Row>
                                <Row className="row"><Col className="profileLabel">{"COLLEGE: "}</Col> <Col className="profileData">{player.college}</Col></Row>
                                <Row className="row"><Col className="profileLabel">{"DRAFT: "}</Col> <Col className="profileData">{player.draftSelection}</Col></Row>
                            </Col>
                        </Row>
                        <Row className="row"><Col className="profileLabel">{"STATUS: "}</Col> <Col className="profileData">{player.status}</Col></Row>
                    </section>
                </Row>
                <Row className="row pt-3">
                    <h2 className="titleCol">
                        STATISTICS
                    </h2>
                    {player.stats ? 
                        <Table className="statsTable">
                            <thead>
                                <tr>
                                    {player.stats.map((stat, key) =>
                                        <th className="tableHeader" style={{backgroundColor: `${color}`}} key={key}>{stat.displayName.toUpperCase()}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {player.stats.map((stat, key) =>
                                        <th style={{backgroundColor: `${color}`}} className="tableRow" key={key}>{stat.displayValue + ` (${stat.rankDisplayValue
                                        })`}</th>
                                    )}
                                </tr>
                            </tbody>
                        </Table>
                    :   
                    <Table bordered>
                        <thead>
                            <tr>
                                <th className="tableHeader" style={{backgroundColor: `${color}`}}>NA</th>
                                <th className="tableHeader" style={{backgroundColor: `${color}`}}>NA</th>
                                <th className="tableHeader" style={{backgroundColor: `${color}`}}>NA</th>
                                <th className="tableHeader" style={{backgroundColor: `${color}`}}>NA</th>
                            </tr>
                        </thead>
                    </Table>
                    }
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default PlayerPopUp;