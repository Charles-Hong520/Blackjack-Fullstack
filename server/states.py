from enum import Enum

state_names = [
    'EMPTY',
    'WAITING',
    'SHUFFLE',
    'BET',
    'DEAL',
    'PLAY',
    'COLLECT'
]

game_enum = Enum('game_state',state_names)

game_state = game_enum.EMPTY