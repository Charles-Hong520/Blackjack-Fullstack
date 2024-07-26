import socketio
import uvicorn
import time
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
sio_app = socketio.ASGIApp(sio)

player_state = {}

@sio.event
async def connect(sid, environ):
    print(sid, 'connected from server')

    player_state[sid] = { 'position' :  0}

    await sio.emit('server_message', 'ur connected lol')

@sio.event
async def disconnect(sid):
    print(sid, 'disconnected from server')

@sio.event
async def game_move(sid, data):
    print(sid, 'got move, with data', data)
    # await sio.emit('server_message', 'ur move got processed')
    movement = 0
    if (data == 'left'): 
        movement = 1
    if (data == 'right'):
        movement = -1

    prev_position = player_state[sid]['position']
    player_state[sid] = { 'position' :  prev_position + movement}

    await sio.emit('new_player_position', {'pid': sid, 'pos' : player_state[sid]['position']})

    return f'you moved {data}, new position: { player_state[sid]["position"] }'



if __name__ == "__main__":
    uvicorn.run("app:sio_app", host="0.0.0.0", port=8000, reload=True)