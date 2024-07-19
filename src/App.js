import './App.css';
import TeamDisplay from './components/TeamDisplay/TeamDisplay';
import MenuButton from './components/MenuButton/MenuButton';
import { Row, Col } from 'react-bootstrap';
import { createContext, useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listTeams } from './graphql/queries';
import { maddenEndpoints } from './constants/constants';

export const TeamContext = createContext(null);
export const MaddenRatingsContext = createContext(null);

function App() {
  const [selectedTeams, setSelectedTeams] = useState({homeTeam: null, awayTeam: null});
  
  const client = generateClient();

  const [ratings, setRatings] = useState(null);
  useEffect(() => {
    getRatings();
  }, [])

  const [teams, setTeams] = useState([]);
  useEffect(()=>{
    getTeams();
  }, [])

  async function getTeams() {
    await client.graphql({ query: listTeams }).then(res => {
      res.data.listTeams.items.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      setTeams(res.data.listTeams.items);
    }, error => {
      console.error(`Could not get array of NFL teams from GraphQL`, error);
    });
  }
  
  function processMaddenData(data) {
      var players = [];
      for (var player of data) {
        players.push({name: player.fullNameForSearch, overall: player.overall_rating});
      }
      return players;
    }
  
  function accessMaddenAPI(endPoint) {
      return fetch(endPoint).then(res => {
        return res.json().then(data => {return processMaddenData(data.docs)});
      }, error => {
        throw new Error("Failed to access madden ratings endpoint: " + error);
      })
    }
  
  async function getRatings() {
    let players = [];
    for (let url of maddenEndpoints) {
      try {
        players = players.concat(await accessMaddenAPI(url));
      } catch(err) {
        console.log(err);
      }
    }
    if (players.length > 0) {setRatings(players)};
  }
  
  return (
    <div className="App">
      <Row className="Row">
        <Col className="menu d-flex align-items-center flex-column" xs={2} lg={1} >
          {teams.map((team, key)=>
            (
              <MenuButton teamData={team}
                          selectedTeams={selectedTeams}
                          setSelectedTeams={setSelectedTeams}
                          key={key}/>
            )
          )}
        </Col>
        <Col className="teams d-flex flex-column">
          <TeamContext.Provider value={ratings}>
            <TeamContext.Provider value={selectedTeams.homeTeam}>
              <Row className="top">
                <TeamDisplay home={true}/>
              </Row>
            </TeamContext.Provider>
            <TeamContext.Provider value={selectedTeams.awayTeam}>
              <Row className="bottom">
                <TeamDisplay home={false}/>
              </Row>
            </TeamContext.Provider>
          </TeamContext.Provider>
        </Col>
      </Row>
    </div>
  );
}

export default App;
