FROM node:14.21.2-alpine as build
WORKDIR /koala
COPY ./src ./src
COPY ./prisma ./prisma
COPY ./package.json ./package.json
COPY .dev.env ./.env
COPY ./tsconfig.json ./tsconfig.json
RUN yarn
RUN yarn build

FROM node:14.21.3 as release
WORKDIR /koala
COPY --from=build /koala/package.json ./package.json
COPY --from=build /koala/dist ./dist
COPY --from=build /koala/.env ./.env
COPY --from=build /koala/node_modules ./node_modules
COPY ./wait-for-it.sh ./wait-for-it.sh

RUN source ./.env

EXPOSE 4000

ENTRYPOINT [ "yarn", "start:prod" ]