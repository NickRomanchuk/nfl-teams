import { generateClient } from 'aws-amplify/api';
import { createTeam} from './graphql/mutations';
import { teams } from '../constants/constants';

const client = generateClient();

async function createTeam(inputs) {
  await client.graphql({
    query: createTeam,
    variables: {
      input: inputs
    }
  });
}
for (let i = 0; i < teams.length; i++) {
  createTeam(teams[i]);
}