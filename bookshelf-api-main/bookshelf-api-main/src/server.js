// Studi Kasus : Buku API - Dicoding
// DHIYAUDDIN AL GHOZI

const Hapi = require('@hapi/hapi');
const routes = require('./routes/books'); // Import file definisi plugin

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
    });

    // Registrasi plugin
    await server.register({
        plugin: require('hapi-cors'), // Menggunakan plugin CORS
    });

    // Tambahan rute-rute dari plugin
    server.route(routes);

    await server.start();
    console.log('Server berjalan pada', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();
