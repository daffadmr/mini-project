import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import CONST from '../utils/constants';

const wsLink = new GraphQLWsLink(createClient({
    url: CONST.WS_URL,
    connectionParams: {
        headers: {
            "x-hasura-admin-secret": CONST.HASURA_KEY
        }
    }
}));

const httpLink = new HttpLink({
    uri: CONST.HTTP_URL,
    headers: {
        'x-hasura-admin-secret': CONST.HASURA_KEY
    }
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
        typePolicies: {
            UserDiary: {
                fields: {
                    Diari: {
                        // shorthand  
                        merge: true,
                    },
                },
            },
        },
    })
});


export default client;