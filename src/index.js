const {
  Client,
  Collection,
  GatewayIntentBits,
  Events,
  ActivityType
} = require("discord.js");

const config = require("./config");
const { connectDatabase, disconnectDatabase, prisma } = require("./database");
const { loadCommands } = require("./handlers/commandHandler");
const MusicManager = require("./music/MusicManager");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.commands = new Collection();
client.music = new MusicManager();
client.db = prisma;

loadCommands(client);

client.once(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}`);
  readyClient.user.setActivity(config.status, { type: ActivityType.Listening });
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    const message = "❌ A apărut o eroare la executarea comenzii.";

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: message, ephemeral: true }).catch(() => {});
    } else {
      await interaction.reply({ content: message, ephemeral: true }).catch(() => {});
    }
  }
});

async function start() {
  await connectDatabase();
  await client.login(config.token);
}

async function shutdown() {
  await client.destroy();
  await disconnectDatabase();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

start().catch(async error => {
  console.error("Startup failed:", error);
  await disconnectDatabase().catch(() => {});
  process.exit(1);
});