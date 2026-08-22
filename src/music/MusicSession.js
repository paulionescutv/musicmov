class MusicSession {
  constructor({ guildId, voiceChannelId, textChannelId }) {
    this.guildId = guildId;
    this.voiceChannelId = voiceChannelId;
    this.textChannelId = textChannelId;
    this.queue = [];
    this.currentTrack = null;
    this.volume = 100;
    this.loop = "off";
    this.paused = false;
    this.player = null;
    this.connection = null;
    this.createdAt = Date.now();
  }

  add(track) {
    this.queue.push(track);
  }

  next() {
    if (this.loop === "track" && this.currentTrack) return this.currentTrack;
    return this.queue.shift() || null;
  }

  clear() {
    this.queue = [];
  }

  destroy() {
    this.queue = [];
    this.currentTrack = null;
    if (this.player?.destroy) this.player.destroy();
    this.player = null;
    this.connection = null;
  }
}

module.exports = MusicSession;