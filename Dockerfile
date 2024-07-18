FROM node:20.10.0 as dev-build

COPY src/ /app/src/
COPY index.js /app/
COPY package.json /app/
COPY package-lock.json /app/

WORKDIR /app
RUN npm ci

FROM dev-build as prod-build

COPY --from=dev-build --chown=10001:root /app/node_modules /app/node_modules
COPY --from=dev-build --chown=10001:root /app/src /app/src
COPY --from=dev-build --chown=10001:root /app/package.json /app/src/package.json
COPY --from=dev-build --chown=10001:root /app/index.js /app/index.js

USER 10001
WORKDIR /app

CMD ["node", "index.js"];
