import Fastify from 'fastify';
import { readFileSync } from 'fs';

import { getActiveUsers, setActiveUser, setInactiveUser, getState, getCurrentInfo, setCurrentInfo, setActiveNFC } from './state.js';

const fastify = Fastify({
    // logger: true,
    http2: true,
    https: {
            key: readFileSync("/etc/letsencrypt/live/api.fs.londschien.com/privkey.pem"),
            cert: readFileSync("/etc/letsencrypt/live/api.fs.londschien.com/cert.pem"),
            allowHTTP1: true,
    }
});

fastify.register(import('fastify-cors'), {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": ['GET', 'PUT', 'POST'],
})

// fastify.addHook('preHandler', (req, reply, done) => {
//     reply.header("Access-Control-Allow-Origin", "*");
//     reply.header("Access-Control-Allow-Methods", "POST");
//     done()
//   })

fastify.post('/api', async ({ body: { type, data } }, reply) => {

    console.log("received message:", { type, data });

    switch (type) {

        case "getActive": {
            return {
                users: getActiveUsers(),
                currentInfo: getCurrentInfo(),
            };
        }

        case "setActive": {
            if (!data) {
                reply.code = 400;
                console.warn(`request of type "${ type }" without data`)
                return;
            }

            setActiveUser(data);
            return;
        }

        case "setInactive": {
            if (!data) {
                reply.code = 400;
                console.warn(`request of type "${ type }" without data`)
                return;
            }

            setInactiveUser(data);
            return;
        }

        case "getState": {
            return {
                users: getState(),
                currentInfo: getCurrentInfo(),
            };
        }

        case "setInfo": {
            if (!data) {
                reply.code = 400;
                console.warn(`request of type "${ type }" without data`)
                return;
            }

            setCurrentInfo(data);
            return;
        }

        case "nfcRead": {
            if (!data) {
                reply.code = 400;
                console.warn(`request of type "${ type }" without data`)
                return;
            }

            setActiveNFC(data);
            return;
        }

    }
});



const start = async () => {
    try {
      await fastify.listen(3000, "0.0.0.0")

    } catch (err) {
      fastify.log.error(err)
      process.exit(1)

    }
  }
  start()