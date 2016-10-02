

# SPEC

- Register user / login user (oauth)

- crud activity

- Add/remove game from activity.
- Add word to game
- Add word

- stats:

Quantes partides?
Errors per partida?



# REDIS


(hash <token=id>) 
users

(hash <prop=value>)
user:xxx = //json
(set)
user:xxx:activity = [set]
user:xxx:activity:enabled

(hash <prop=value>)
activity:xxx
(set)
activity:xxx:game

(hash)
game:xxx

(set)
game:xxx:words:[word, word, word]

(hash)
word:xxx


