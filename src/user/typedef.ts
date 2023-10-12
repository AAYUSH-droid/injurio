export const typeDefs = `#graphql
    type User {
        id: Int!
        username: String!
        email: String!
        password: String!
        injuryReports: [InjuryReport!]!
  } 
`;
