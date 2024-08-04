import socketio
sio = socketio.AsyncServer(async_mode='asgi')
sio_app = socketio.ASGIApp(sio)




@sio.event
async def connect(sid, environ):
    print(sid, 'connected from server')

@sio.event
async def disconnect(sid):
    print(sid, 'disconnected from server')


    