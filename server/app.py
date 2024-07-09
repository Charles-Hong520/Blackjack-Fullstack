import socketio
import uvicorn
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
sio_app = socketio.ASGIApp(sio)

@sio.event
async def connect(sid, environ):
    print(sid, 'connected from server')
    await sio.emit('server_message', 'ur connected lol')

@sio.event
async def disconnect(sid):
    print(sid, 'disconnected from server')

@sio.event
async def game_move(sid, name):
    print(sid, 'got move')
    await sio.emit('server_message', 'ur move got processed')

if __name__ == "__main__":
    uvicorn.run("app:sio_app", host="0.0.0.0", port=8000, reload=True)