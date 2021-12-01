import {
  ApolloClient,
  gql,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { BASE_URL, BASE_WS } from "./constants";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: `${BASE_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("vivi-jwt");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const wsLink = new WebSocketLink({
  uri: `${BASE_WS}/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        authorization: `Bearer ${localStorage.getItem("vivi-jwt")}`,
      },
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
  },
});

const GET_SERVICES_FOR_ROUTER = gql`
  query ($routerId: String!) {
    getServicesForRouter(routerId: $routerId) {
      _id
      name
      bandwidth
      tags {
        name
        _id
      }
    }
  }
`;

const GET_ROUTERS = gql`
  query {
    getRouters {
      _id
      name
      url
    }
  }
`;

const GET_ROUTER = gql`
  query ($routerId: String!) {
    getRouter(id: $routerId) {
      _id
      url
      name
    }
  }
`;

const UPDATE_ROUTER = gql`
  mutation ($routerUpdateData: RouterUpdateInput!) {
    updateRouter(updateRouterData: $routerUpdateData) {
      _id
      url
      name
    }
  }
`;

const GET_BANS_FOR_ROUTER = gql`
  query ($routerId: String!) {
    getBans(id: $routerId) {
      address
      banned
      _id
      displayName
    }
  }
`;

const UPDATE_BAN = gql`
  mutation ($banUpdate: BanUpdate!) {
    updateBan(banUpdateData: $banUpdate) {
      _id
      banned
      address
      displayName
    }
  }
`;

const ON_BAN_CREATED = gql`
  subscription ($routerId: String!) {
    banCreated(routerSet: $routerId) {
      address
      _id
      displayName
    }
  }
`;

const ON_SERVICE_CREATED = gql`
  subscription ($routerId: String!) {
    serviceCreated(routerId: $routerId) {
      _id
      name
      banned
    }
  }
`;

const UPDATE_SERVICE = gql`
  mutation ($serviceUpdate: ServiceUpdateInput!) {
    updateService(serviceUpdateData: $serviceUpdate) {
      name
      _id
      banned
    }
  }
`;

const LOGIN = gql`
  mutation ($loginData: LoginInput!) {
    login(loginData: $loginData) {
      access_token
      user {
        _id
        email
        username
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation ($userUpdateInput: UserUpdateInput!) {
    updateUser(userUpdateData: $userUpdateInput) {
      email
      username
    }
  }
`;

const TOGGLE_2FA = gql`
  mutation {
    toggleOTP
  }
`;

const CHECK_2FA = gql`
  mutation ($code: String!) {
    checkOtpCode(code: $code)
  }
`;

const ME = gql`
  query {
    me {
      email
      username
      otp_secret
      otp_enabled
      _id
    }
  }
`;

const GET_OTP_URL = gql`
  query {
    getOtpUrl
  }
`;

const GET_CONFIGS = gql`
  query {
    getConfigs {
      _id
      public
      name
      services {
        _id
      }
      configs {
        _id
      }
    }
  }
`;

const GET_CONFIG = gql`
  query ($configId: String!) {
    getConfig(id: $configId) {
      _id
      public
      name
    }
  }
`;

const GET_SERVICES = gql`
  query {
    getServices {
      _id
      name
      bandwidth
      ips
      banned
    }
  }
`;

const CREATE_CONFIG = gql`
  mutation ($configCreateData: ConfigCreationInput!) {
    createConfig(configCreateData: $configCreateData) {
      _id
    }
  }
`;

const DELETE_CONFIG = gql`
  mutation ($id: String!) {
    deleteConfig(id: $id) {
      _id
    }
  }
`;

const UPDATE_CONFIG = gql`
  mutation ($configUpdateData: ConfigUpdateInput!) {
    updateConfig(configUpdateData: $configUpdateData) {
      _id
    }
  }
`;

export {
  client,
  GET_ROUTERS,
  GET_ROUTER,
  UPDATE_ROUTER,
  GET_BANS_FOR_ROUTER,
  UPDATE_BAN,
  ON_BAN_CREATED,
  LOGIN,
  GET_SERVICES_FOR_ROUTER,
  UPDATE_USER,
  TOGGLE_2FA,
  CHECK_2FA,
  ME,
  GET_OTP_URL,
  ON_SERVICE_CREATED,
  UPDATE_SERVICE,
  GET_CONFIGS,
  GET_CONFIG,
  GET_SERVICES,
  CREATE_CONFIG,
  DELETE_CONFIG,
  UPDATE_CONFIG
};
