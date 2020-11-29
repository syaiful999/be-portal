FROM node:10.11-alpine as builder
# ARG SERVER_ENV=''
RUN apk add --update

COPY . .
# RUN rm -rf src/config/config.json
# RUN cp -f src/config/config.json src/config/config.json
RUN cat src/config/config.json
RUN npm install
RUN npm run lint
RUN npm run build

#Distribution
FROM node:10.11-alpine
COPY --from=builder build build
COPY --from=builder package.json package.json
COPY --from=builder node_modules node_modules
RUN mkdir build/attachment-file
CMD ["npm", "run", "build:start"]
EXPOSE 2000