FROM node:18.10.0 AS build

WORKDIR /koala

COPY ./src ./src
COPY ./prisma ./prisma
COPY ./package.json ./package.json
COPY .dev.env ./.env
COPY ./tsconfig.json ./tsconfig.json
RUN yarn
RUN yarn build

FROM node:18.10.0 AS release

WORKDIR /koala

COPY --from=build /koala/package.json ./package.json
COPY --from=build /koala/dist ./dist
COPY --from=build /koala/.env ./.env
COPY --from=build /koala/node_modules ./node_modules
COPY ./public ./public

RUN . ./.env

EXPOSE 3000

ENTRYPOINT [ "yarn", "start:prod" ]