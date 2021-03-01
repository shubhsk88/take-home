const { Keystone } = require("@keystonejs/keystone");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { User } = require("./schema/User");
const {
  KnexAdapter: Adapter,
  KnexAdapter,
} = require("@keystonejs/adapter-knex");
const insertSeedData = require("./seed");
require("dotenv/config");

const PROJECT_NAME = "Backend";

const adapterConfig = {
  knexOptions: { connection: process.env.DB_URL },
};

/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  cookieSecret: "machen",
  onConnect: async (keystone) => {
    console.log("hi");
    if (process.argv.includes("--seed-data")) {
      await insertSeedData(keystone);
    }
  },
});

keystone.createList("User", User);

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({ name: PROJECT_NAME, enableDefaultRoute: true }),
  ],
};
