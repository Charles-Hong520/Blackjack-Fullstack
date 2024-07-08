import socketio
import uvicorn
sio = socketio.AsyncServer(async_mode='asgi')
sio_app = socketio.ASGIApp(sio, static_files={'/' : '../app/'})

@sio.event
async def connect(sid, environ):
    print(sid, 'connected from server')

@sio.event
async def disconnect(sid):
    print(sid, 'disconnected from server')

if __name__ == "__main__":
    uvicorn.run("app:sio_app", host="0.0.0.0", port=8000, reload=True)