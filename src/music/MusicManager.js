const MusicSession = require("./MusicSession");

class MusicManager {
  constructor() { this.sessions = new Map(); }
  key(guildId, voiceChannelId) { return `${guildId}:${voiceChannelId}`; }

  get(guildId, voiceChannelId) {
    return this.sessions.get(this.key(guildId, voiceChannelId));
  }

  create(guildId, voiceChannelId, textChannelId) {
    const key = this.key(guildId, voiceChannelId);
    let session = this.sessions.get(key);
    if (!session) {
      session = new MusicSession({ guildId, voiceChannelId, textChannelId });
      this.sessions.set(key, session);
    }
    return session;
  }

  destroy(guildId, voiceChannelId) {
    const key = this.key(guildId, voiceChannelId);
    const session = this.sessions.get(key);
    if (!session) return false;
    session.destroy();
    this.sessions.delete(key);
    return true;
  }

  getGuildSessions(guildId) {
    return [...this.sessions.values()].filter(s => s.guildId === guildId);
  }
}

module.exports = MusicManager;