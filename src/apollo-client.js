import { ApolloClient, InMemoryCache } from "@apollo/client";

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";



const httpLink = new HttpLink({
  uri:process.env.REACT_APP_HASURA_URI,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.REACT_APP_WS_ENDPOINT,
  })
);

const splitLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;