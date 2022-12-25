const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLList,
} = require("graphql");

const Project = require("../models/Project");
const Client = require("../models/Client");
const { ClientType } = require("./clientObject");

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parent) => Client.findById(parent.clientId),
    },
  }),
});

const ProjectQuery = {
  projects: {
    type: new GraphQLList(ProjectType),
    resolve: () => Project.find(),
  },
  project: {
    type: ProjectType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: (parent, args) => Project.findById(args.id),
  },
};

const ProjectMutation = {
  addProject: {
    type: ProjectType,
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      status: {
        type: new GraphQLEnumType({
          name: "ProjectStatus",
          values: {
            new: { value: "Not Started" },
            progress: { value: "In Progress" },
            completed: { value: "Completed" },
          },
        }),
        defaultValue: "Not Started",
      },
      clientId: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve: (parent, args) => {
      const project = new Project(args);
      return project.save();
    },
  },

  deleteProject: {
    type: ProjectType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: (parent, args) => Project.findByIdAndRemove(args.id),
  },

  updateProject: {
    type: ProjectType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      status: {
        type: new GraphQLEnumType({
          name: "ProjectStatusUpdate",
          values: {
            new: { value: "Not Started" },
            progress: { value: "In Progress" },
            completed: { value: "Completed" },
          },
        }),
      },
    },
    resolve: (parent, args) => {
      return Project.findByIdAndUpdate(
        args.id,
        {
          $set: {
            name: args.name,
            description: args.description,
            status: args.status,
          },
        },
        { returnOriginal: false }
      );
    },
  },
};

module.exports = { ProjectType, ProjectMutation, ProjectQuery };
