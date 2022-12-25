const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLList,
} = require("graphql");
const Client = require("../models/Client");

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ClientQuery = {
  clients: {
    type: new GraphQLList(ClientType),
    resolve: () => Client.find({}),
  },
  client: {
    type: ClientType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: (parent, args) => Client.findById(args.id),
  },
};

const ClientMutation = {
  addClient: {
    type: ClientType,
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
    },
    resolve: (parent, args) => {
      const client = new Client({
        name: args.name,
        email: args.email,
        phone: args.phone,
      });
      return client.save();
    },
  },
  deleteClient: {
    type: ClientType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve: (parent, args) => {
      return Client.findByIdAndRemove(args.id);
    },
  },
  updateClient: {
    type: ClientType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
    },
    resolve: (parent, args) => {
      return Client.findByIdAndUpdate(
        args.id,
        {
          $set: {
            name: args.name,
            email: args.email,
            phone: args.phone,
          },
        },
        {
          returnOriginal: false,
        }
      );
    },
  },
};

module.exports = { ClientType, ClientMutation, ClientQuery };
