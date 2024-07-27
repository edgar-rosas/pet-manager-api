FROM node:20.15.1-bullseye-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /usr/src/app
COPY ["package.json", "pnpm-lock.yaml*", "tsconfig.json", "./"]
RUN corepack enable pnpm

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000
RUN chown -R node ./
USER node
ENTRYPOINT ["dumb-init", "node", "--inspect-brk=0.0.0.0", "--no-warnings=ExperimentalWarning", "--loader", "ts-node/esm", "src/server.ts" ]
