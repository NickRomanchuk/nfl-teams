import {Col, Row} from "react-bootstrap";
import "./DepthChart.css"
import PostitionGroup from "../PositionGroup/PositionGroup";
import { createContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

export const RatingsContext = createContext()

function DepthChart(props) {
    const [ratings, setRatings] = useState(null) 
    
    function processMaddenData(data) {
        var players = [];
        for (var player of data) {
          var newPlayer = {};
          newPlayer.name  = player.fullNameForSearch;
          newPlayer.overall = player.overall_rating;
          players.push(newPlayer);
        }
        return players;
      }
    
    function accessMaddenAPI(endPoint) {
        return fetch(endPoint).then(res => {
          if (!res.ok) {
            throw new Error("Response from Madden endpoint failed: " + res.status);
          } else {
            return res.json().then(data => {   
              return processMaddenData(data.docs)
            })
          }
        }, error => {
          throw new Error("Failed to access madden endpoint: " + error);
        })
      }
    
    async function getRatings() {
        try {
          let players = await accessMaddenAPI("https://ratings-api.ea.com/v2/entities/m24-ratings?limit=1000")
          players = players.concat(await accessMaddenAPI("https://ratings-api.ea.com/v2/entities/m24-ratings?offset=1000"))
          setRatings(players)
        } catch(err) {
          console.log(err);
        }  
    }
    
    useEffect(() => {
        getRatings();
    }, [props])

    return (
        <>
        {ratings ?
            <RatingsContext.Provider value={ratings} >
                {props.isOff ? 
                    <Col className="team-col">
                        <Row className="player-row">
                            <Col xs={1}></Col>
                            <PostitionGroup label={"wr1"} athletes={props.roster["wr1"]["athletes"]}/>
                            <Col></Col>
                            <PostitionGroup label={"lt"} athletes={props.roster["lt"]["athletes"]}/>
                            <PostitionGroup label={"lg"} athletes={ props.roster["lg"]["athletes"]}/>
                            <PostitionGroup label={"c"} athletes={props.roster["c"]["athletes"]}/>
                            <PostitionGroup label={"rg"} athletes={props.roster["rg"]["athletes"]}/>
                            <PostitionGroup label={"rt"} athletes={props.roster["rt"]["athletes"]}/>
                            <Col></Col>
                            <PostitionGroup label={"wr2"} athletes={props.roster["wr2"]["athletes"]}/>
                            <Col xs={1}></Col>
                        </Row>
                        <Row className="player-row">
                            <Col xs={2}></Col>
                            <PostitionGroup label={"wr3"} athletes={props.roster["wr3"]["athletes"]}/>
                            <Col></Col>
                            <PostitionGroup label={"qb"} athletes={props.roster["qb"]["athletes"]}/>
                            <Col xs={2}></Col>
                            <PostitionGroup label={"te"} athletes={props.roster["te"]["athletes"]}/>
                            <Col ></Col>
                        </Row>
                        <Row className="player-row">
                            <Col></Col>
                            <PostitionGroup label={"rb"} athletes={props.roster["rb"]["athletes"]}/>
                            {props.roster["fb"] &&
                                <>
                                    <Col xs={1}></Col>
                                    <PostitionGroup label={"fb"} athletes={props.roster["fb"]["athletes"]}/>
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
                                <PostitionGroup label={"lcb"} athletes={props.roster["lcb"]["athletes"]}/>
                                <Col xs={2}></Col>
                                <PostitionGroup label={"lde"} athletes={props.roster["lde"]["athletes"]}/>
                                <Col></Col>
                                {props.roster["nt"] ?
                                    <PostitionGroup label={"nt"} athletes={props.roster["nt"]["athletes"]}/>
                                    :
                                    <>
                                        <PostitionGroup label={"ldt"} athletes={props.roster["ldt"]["athletes"]}/>
                                        <Col></Col>
                                        <PostitionGroup label={"rdt"} athletes={props.roster["rdt"]["athletes"]}/>
                                    </>
                                }
                                <Col></Col>
                                <PostitionGroup label={"rde"} athletes={props.roster["rde"]["athletes"]}/>
                                <Col xs={2}></Col>
                                <PostitionGroup label={"rcb"} athletes={props.roster["rcb"]["athletes"]}/>
                                <Col></Col>
                            </Row>
                            <Row className="player-row">
                                <Col xs={2}></Col>
                                {props.roster["nb"]  ?
                                <>
                                    <PostitionGroup label={"nb"}  athletes={props.roster["nb"]["athletes"]}/>
                                </> : <Col xs={1}></Col>
                                }
                                <Col></Col>
                                <PostitionGroup label={"wlb"}  athletes={props.roster["wlb"]["athletes"]}/>
                                
                                {props.roster["mlb"] ?
                                    <>
                                        <Col></Col>
                                        <PostitionGroup label={"mlb"} athletes={props.roster["mlb"]["athletes"]}/>
                                        <Col></Col>
                                    </>
                                    :
                                    <>
                                        <Col></Col>
                                        <PostitionGroup label={"lilb"} athletes={props.roster["lilb"]["athletes"]}/>
                                        <Col></Col>
                                        <PostitionGroup label={"rilb"} athletes={props.roster["rilb"]["athletes"]}/>
                                        <Col></Col>
                                    </>
                                }
                                <PostitionGroup label={"slb"} athletes={props.roster["slb"]["athletes"]}/>
                                <Col xs={props.roster["mlb"] ? 2 : 3}></Col>
                            </Row>
                            <Row className="player-row">
                                <Col xs={4}></Col>
                                <PostitionGroup label={"fs"} athletes={props.roster["fs"]["athletes"]}/>
                                <Col></Col>
                                <PostitionGroup label={"ss"} athletes={props.roster["ss"]["athletes"]}/>
                                <Col xs={4}></Col>
                            </Row>
                        </Col>
                    </>
                }
            </RatingsContext.Provider>
        :
        <Col className="team-col d-flex align-items-center justify-content-center flex-column">
            <RotatingLines
                visible={true}
                strokeWidth="5"
                strokeColor="white"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
            />
            </Col>
        }
        </>
    )
}

export default DepthChart;