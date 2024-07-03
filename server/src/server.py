from flask import Flask, request
from flask_socketio import SocketIO, send, emit
# from flask_cors import CORS

app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")

game_state = {}

@app.route('/api', methods=['GET'])
def index():
    return "Game API"

@socketio.on('player_move')
def handle_player_move(move):
    # Update game state based on the move
    global game_state
    game_state['move'] = move
    print('move', move)
    emit('game_state', game_state, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=False,allow_unsafe_werkzeug=True)
