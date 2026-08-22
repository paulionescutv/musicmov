# Architecture

## Music

A music session is uniquely identified by:

`guildId + voiceChannelId`

This intentionally avoids a single-player-per-guild design.

Each session owns:
- queue
- current track
- volume
- loop state
- paused state
- Lavalink player reference
- Discord voice connection reference

A future Lavalink adapter should connect each session to its own Lavalink player. The manager can therefore keep multiple independent players alive across the same guild and across different guilds.

## Database

PostgreSQL stores persistent configuration and application data. Runtime playback state remains in memory for speed and is reconstructed when sessions are created.

## Expansion

Recommended next modules:
- Lavalink adapter
- play/search/queue commands
- autoplay
- playlist persistence
- permissions/DJ roles
- moderation
- tickets
- reaction roles
- dashboard
