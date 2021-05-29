import os
import io
import base64
from flask import Flask, send_file, request, jsonify
from flask_cors import CORS
from predict import stylize

app = Flask(__name__)

CORS(app)
UPLOAD_FOLDER = os.path.join('','images')

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/upload", methods = ['POST'])
def upload_file():

    file = request.files['Images']

    #path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    path = 'images/'+str(file.filename)
    file.save(path)

    stylize({
        'output': 'output/output.jpg',
        'model': 'models/udnie.pth',
        'image': path
    })

    return jsonify({
        "captions":"Refresh again !"
        })  
    #return send_file('output/output.jpg',mimetype='image/gif')
    
@app.route('/result', methods = ['GET'])
def sendImage():
    return send_file('output/output.jpg',mimetype='image/gif', cache_timeout=0)




if __name__ == '__main__':  # Script executed directly
    app.run() 