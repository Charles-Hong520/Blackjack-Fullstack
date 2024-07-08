import socketio

sio = socketio.AsyncServer(async_mode='asgi')
app = socketio.ASGIApp(sio, static_files={
    '/' : './../app/'
})

@sio.event
async def connect(sid, environ):
    print(sid, 'connected from server')

@sio.event
async def disconnect(sid):
    print(sid, 'disconnected from server')
