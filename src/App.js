import './App.css';
import TeamDisplay from './components/TeamDisplay/TeamDisplay';
import MenuButton from './components/MenuButton/MenuButton';
import { Row, Col } from 'react-bootstrap';
import { createContext, useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listTeams } from './graphql/queries';

export const TeamContext = createContext(null);

function App() {
  const [selectedTeams, setSelectedTeams] = useState({homeTeam: "", awayTeam: ""});
  const [teams, setTeams] = useState([]);

  const client = generateClient();

  async function getTeams() {
    await client.graphql({ query: listTeams }).then(res => {
      //console.log("Teams: ", res.data.listTeams.items);
      res.data.listTeams.items.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      setTeams(res.data.listTeams.items);
    }, error => {
      console.error(`Could not reach backend`, error);
    });
  }
  
  useEffect(()=>{getTeams();}, [])

  return (
    <div className="App">
      <Row className="Row">
        <Col className="menu d-flex align-items-center flex-column" xs={2} lg={1} >
          {teams.map((team, key)=>
            (
              <MenuButton selectedTeams={selectedTeams}
                          setSelectedTeams={setSelectedTeams}
                          name={team.name}
                          key={key}/>
            )
          )}
        </Col>
        <Col className="teams d-flex flex-column">
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
        </Col>
      </Row>
    </div>
  );
}

export default App;
