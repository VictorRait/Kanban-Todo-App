import { HttpLink, ApolloLink, ApolloClient } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { OperationTypeNode } from "graphql";
import { InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
	uri: "https://kanban-server-pyrd.onrender.com/graphql",
});

const wsLink = new GraphQLWsLink(
	createClient({
		url: "wss://kanban-server-pyrd.onrender.com/graphql",
	}),
);

const splitLink = ApolloLink.split(
	({ operationType }) => operationType === OperationTypeNode.SUBSCRIPTION,
	wsLink,
	httpLink,
);

export const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});
