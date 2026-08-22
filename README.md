# MOV Discord Bot

Modular Discord bot foundation built with Node.js, Discord.js, PostgreSQL and Prisma.

## Features included

- Discord.js v14
- PostgreSQL + Prisma
- Per-guild configuration
- Slash commands
- Multi-session music architecture
- Independent music session per voice channel
- Lavalink configuration
- Docker Compose for PostgreSQL + Lavalink
- Romanian-ready command descriptions
- Secure `.env` configuration

## Quick start

1. Install Node.js 22+
2. Copy `.env.example` to `.env`
3. Fill in Discord and PostgreSQL credentials
4. Start PostgreSQL/Lavalink with Docker Compose:
   `docker compose up -d`
5. Install dependencies:
   `npm install`
6. Generate Prisma client:
   `npm run prisma:generate`
7. Create database schema:
   `npm run db:push`
8. Deploy slash commands:
   `npm run deploy:commands`
9. Start:
   `npm start`

## Music architecture

Music is keyed by `guildId + voiceChannelId`. Every voice channel gets an independent MusicSession, queue and player state. This allows multiple voice channels in the same guild to play different tracks simultaneously, subject to Discord/Lavalink/VPS resource limits.

The current archive contains the clean foundation and session manager. A Lavalink client can be attached to `MusicSession` without changing the database architecture.

## Security

Never commit `.env`. Only `.env.example` belongs in Git.
