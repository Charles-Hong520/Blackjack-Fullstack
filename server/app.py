import socketio
import uvicorn
from states import game_state, game_enum
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
sio_app = socketio.ASGIApp(sio)

@sio.event
async def connect(sid, environ):
    print(sid, 'connected from server')

    player_state[sid] = { 'position' :  0}

    await sio.emit('server_message', 'ur connected lol')

@sio.event
async def disconnect(sid):
    print(sid, 'disconnected from server')
    if sid in waiting:
        waiting.remove(sid)

waiting = []
game_state = game_enum.EMPTY
@sio.event
async def join_waiting(sid, data):
    if sid in waiting:
        return f"ERROR: {sid} already in waiting"

    game_state = game_enum.WAITING
    waiting.append(sid)
    print(game_state)
    return "OK joined waiting"

@sio.event
async def leave_waiting(sid, data):
    if sid not in waiting:
        return f"ERROR: {sid} not in waiting"

    print(game_state)
    
    waiting.remove(sid)
    return "OK leave Waiting"










player_state = {}
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