import Fastify from 'fastify';

import { getActiveUsers, setActiveUser, setInactiveUser, getState, getCurrentInfo, setCurrentInfo } from './state.js';

const fastify = Fastify({
    // logger: true
});

fastify.register(import('fastify-cors'), {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
})

// fastify.addHook('preHandler', (req, reply, done) => {
//     reply.header("Access-Control-Allow-Origin", "*");
//     reply.header("Access-Control-Allow-Methods", "POST");
//     done()
//   })

fastify.post('/api', async ({ body: { type, data } }, reply) => {

    console.log({ type, data });

    switch (type) {
        case "getActive": {
            return {
                users: getActiveUsers(),
                currentInfo: getCurrentInfo(),
            };
        }
        case "setActive": {
            setActiveUser(data);
            return;
        }
        case "setInactive": {
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
            return setCurrentInfo(data);
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