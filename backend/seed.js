const users = require("./users.json");

async function insertSeedData(ks) {
  const keystone = ks.keystone || ks;
  const adapter = keystone.adapters?.KnexAdapter || keystone.adapter;

  console.log(`Inserting Seed Data: ${users.length} Users`);
  const { knex } = adapter;

  for (const user of users) {
    await knex("User").insert(user);
    console.log(`  🛍️ Adding User: ${user.name}`);
  }
  console.log(`✅ Seed Data Inserted: ${users.length} Users`);
  console.log(
    `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
  );
  process.exit();
}

module.exports = insertSeedData;
