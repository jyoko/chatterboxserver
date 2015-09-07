# Chatterbox w/ Server

Extending the [client](https://github.com/jyoko/chatterboxclient) to include a server, also worked on with a partner.

Additionally worked over to include live chatting via Websockets (with socket.io) instead of polling. Socket.io includes its own fallback to long-polling internally, so keeping both around is somewhat unnecessary, but the client does allow for switching between simple AJAX and the sockets.
