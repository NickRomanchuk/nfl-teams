/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTeam = /* GraphQL */ `
  query GetTeam($name: String!) {
    getTeam(name: $name) {
      name
      color
      espnID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $name: String
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTeams(
      name: $name
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        name
        color
        espnID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
