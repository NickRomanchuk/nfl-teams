import { generateClient } from "aws-amplify/api";
import { getTeam } from "../../graphql/queries";

export async function getOneTeam(name, setter) {
    var client = generateClient();
    await client.graphql({
        query: getTeam,
        variables: { name: name }
    }).then(res => {
        //console.log(res.data.getTeam);
        setter(res.data.getTeam);
    }, error => {
        console.error(`Could not reach backend`, error);
    });;
}