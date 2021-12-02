const Fastify = require('fastify');

const plugin = async function (fastify, opts, done) {
    fastify.decorate('toto', 'totoValue');
    throw new Error('oh no')
  
    fastify.get('/', () => {
        console.log(fastify.toto)
        return fastify.toto;
    })

    console.log('p1 OK')
  
    // done()
  }

  const plugin2 = async function (fastify, opts, done) {
      console.log('init p2', fastify.toto)
    fastify.decorate('toto2', 'fastify.toto');
    // throw new Error('oh no')
  
    fastify.get('/2', () => {
        console.log('2', fastify.toto, fastify.toto2)
        return fastify.toto;
    })
    
    done()
  }
  

async function run() {
    
    const fastify = Fastify({
    });
    fastify.register(plugin);
    // await fastify.register(plugin2);
    // fastify.register(plugin).register(plugin2)
    fastify.after((err) => {
        if(err) {
            throw new Error(err)
        }
        fastify.register(plugin2)
    })
    fastify.listen(3000, '0.0.0.0');

}

run()