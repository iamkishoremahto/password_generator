from flask import render_template,jsonify
from application import app
from english_dictionary.scripts.read_pickle import get_dict
import random


@app.route('/')
def homepage():
    return render_template('homepage.html')



@app.route('/random_password')
def get_random_password():
    english_dict = get_dict()
    special_characters = {'a':['@'],'s':['$','&'],'h':['#'],'l':['!','1'],'i':['!'],'v':['^'],'t':['+']}
    random_password = random.choice(list(english_dict.keys()))
    random_password = ''.join([str(char).lower() for char in random_password])

  
    for special_char in list(special_characters.keys()):
        
        if special_char in [str(char) for char in random_password]:
            special_char_index = random_password.find(special_char)
            random_password = list(random_password)
            random_password[special_char_index] = random.choice(special_characters[special_char])
            random_password = ''.join(random_password)
            break

    for i in range(2):

        random_char = random.choice(random_password)
        random_password = random_password.replace(random_char,random_char.upper())
    random_password = random_password + str(random.randint(0,99))
    return jsonify(random_password)



    