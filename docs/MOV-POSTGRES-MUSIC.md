# MOV Bot integration

This archive preserves the uploaded bot repository and adds a PostgreSQL/Prisma persistence layer plus a multi-session music foundation.

## Multi-voice design

A music session is keyed by `guildId + voiceChannelId`.

That means the same Discord guild can have independent music sessions in multiple voice channels at the same time. Each session has its own queue, current track, volume, loop state and Lavalink player reference.

## Database

PostgreSQL stores persistent server configuration, members, moderation warnings, reaction roles, tickets and custom commands. Runtime playback state remains in memory.

## Start

1. Copy `.env.example` to `.env`.
2. Fill Discord credentials.
3. Set `DATABASE_URL`.
4. Run `docker compose up -d`.
5. Install dependencies.
6. Run `npx prisma generate`.
7. Run `npx prisma db push`.
8. Start the bot using the repository's normal start command.

Do not commit `.env`.
