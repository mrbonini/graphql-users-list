import { gql } from "apollo-boost";

export const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      email
      name
      role
    }
  }
`;

export const GET_USER = gql`
  query getUser($email: ID!) {
    user(email: $email) {
      name
      email
      role
    }
  }
`