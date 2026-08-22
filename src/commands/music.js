const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("music")
    .setDescription("Comenzi pentru sistemul music multi-voice.")
    .addSubcommand(sub =>
      sub.setName("status").setDescription("Afișează sesiunile music active.")
    )
    .addSubcommand(sub =>
      sub.setName("join").setDescription("Creează o sesiune în canalul voice curent.")
    )
    .addSubcommand(sub =>
      sub.setName("leave").setDescription("Închide sesiunea din canalul voice curent.")
    ),

  async execute(interaction) {
    const manager = interaction.client.music;
    const memberChannel = interaction.member.voice.channel;

    if (interaction.options.getSubcommand() === "status") {
      const sessions = manager.getGuildSessions(interaction.guildId);
      if (!sessions.length) {
        return interaction.reply("🎵 Nu există sesiuni music active pe acest server.");
      }

      const text = sessions.map((s, i) =>
        `${i + 1}. <#${s.voiceChannelId}> — ${s.currentTrack?.title || "idle"} — ${s.queue.length} în queue`
      ).join("\n");

      return interaction.reply(`🎵 **Sesiuni active:**\n${text}`);
    }

    if (!memberChannel) {
      return interaction.reply({ content: "❌ Intră mai întâi într-un canal voice.", ephemeral: true });
    }

    if (interaction.options.getSubcommand() === "join") {
      const session = manager.create(interaction.guildId, memberChannel.id, interaction.channelId);
      return interaction.reply(`🎵 Sesiune creată pentru <#${memberChannel.id}>. Session: \`${session.voiceChannelId}\``);
    }

    if (interaction.options.getSubcommand() === "leave") {
      const removed = manager.destroy(interaction.guildId, memberChannel.id);
      return interaction.reply(removed ? "👋 Sesiunea music a fost închisă." : "ℹ️ Nu există o sesiune în acest canal.");
    }
  }
};