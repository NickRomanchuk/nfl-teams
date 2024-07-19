import {Col, Row} from "react-bootstrap";
import "./DepthChart.css"
import PostitionGroup from "../PositionGroup/PositionGroup";

function DepthChart({ isOff, roster }) {
    return (
        <>
            {isOff ? 
                <Col className="team-col">
                    <Row className="player-row">
                        <Col xs={1}></Col>
                        <PostitionGroup label={"wr1"} athletes={roster["wr1"]["athletes"]}/>
                        <Col></Col>
                        <PostitionGroup label={"lt"} athletes={roster["lt"]["athletes"]}/>
                        <PostitionGroup label={"lg"} athletes={roster["lg"]["athletes"]}/>
                        <PostitionGroup label={"c"} athletes={roster["c"]["athletes"]}/>
                        <PostitionGroup label={"rg"} athletes={roster["rg"]["athletes"]}/>
                        <PostitionGroup label={"rt"} athletes={roster["rt"]["athletes"]}/>
                        <Col></Col>
                        <PostitionGroup label={"wr2"} athletes={roster["wr2"]["athletes"]}/>
                        <Col xs={1}></Col>
                    </Row>
                    <Row className="player-row">
                        <Col xs={2}></Col>
                        <PostitionGroup label={"wr3"} athletes={roster["wr3"]["athletes"]}/>
                        <Col></Col>
                        <PostitionGroup label={"qb"} athletes={roster["qb"]["athletes"]}/>
                        <Col xs={2}></Col>
                        <PostitionGroup label={"te"} athletes={roster["te"]["athletes"]}/>
                        <Col ></Col>
                    </Row>
                    <Row className="player-row">
                        <Col></Col>
                        <PostitionGroup label={"rb"} athletes={roster["rb"]["athletes"]}/>
                        {roster["fb"] &&
                            <>
                                <Col xs={1}></Col>
                                <PostitionGroup label={"fb"} athletes={roster["fb"]["athletes"]}/>
                            </>
                        }
                        <Col></Col>
                    </Row>
                </Col>
            :
                <>
                    <Col className="team-col">
                        <Row className="player-row">
                            <Col xs={1}></Col>
                            <PostitionGroup label={"lcb"} athletes={roster["lcb"]["athletes"]}/>
                            <Col xs={2}></Col>
                            <PostitionGroup label={"lde"} athletes={roster["lde"]["athletes"]}/>
                            <Col></Col>
                            {roster["nt"] ?
                                <PostitionGroup label={"nt"} athletes={roster["nt"]["athletes"]}/>
                                :
                                <>
                                    <PostitionGroup label={"ldt"} athletes={roster["ldt"]["athletes"]}/>
                                    <Col></Col>
                                    <PostitionGroup label={"rdt"} athletes={roster["rdt"]["athletes"]}/>
                                </>
                            }
                            <Col></Col>
                            <PostitionGroup label={"rde"} athletes={roster["rde"]["athletes"]}/>
                            <Col xs={2}></Col>
                            <PostitionGroup label={"rcb"} athletes={roster["rcb"]["athletes"]}/>
                            <Col></Col>
                        </Row>
                        <Row className="player-row">
                            <Col xs={2}></Col>
                            {roster["nb"]  ?
                            <>
                                <PostitionGroup label={"nb"}  athletes={roster["nb"]["athletes"]}/>
                            </> : <Col xs={1}></Col>
                            }
                            <Col></Col>
                            <PostitionGroup label={"wlb"}  athletes={roster["wlb"]["athletes"]}/>
                                
                            {roster["mlb"] ?
                                <>
                                    <Col></Col>
                                    <PostitionGroup label={"mlb"} athletes={roster["mlb"]["athletes"]}/>
                                    <Col></Col>
                                </>
                                   :
                                <>
                                    <Col></Col>
                                    <PostitionGroup label={"lilb"} athletes={roster["lilb"]["athletes"]}/>
                                    <Col></Col>
                                    <PostitionGroup label={"rilb"} athletes={roster["rilb"]["athletes"]}/>
                                    <Col></Col>
                                </>
                            }
                            <PostitionGroup label={"slb"} athletes={roster["slb"]["athletes"]}/>
                            <Col xs={roster["mlb"] ? 2 : 3}></Col>
                        </Row>
                        <Row className="player-row">
                            <Col xs={4}></Col>
                            <PostitionGroup label={"fs"} athletes={roster["fs"]["athletes"]}/>
                            <Col></Col>
                            <PostitionGroup label={"ss"} athletes={roster["ss"]["athletes"]}/>
                            <Col xs={4}></Col>
                        </Row>
                    </Col>
                </>
            }
        </>
    )
}

export default DepthChart;