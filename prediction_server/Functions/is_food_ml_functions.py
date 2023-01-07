import tensorflow as tf
from keras.models import *
from keras.layers import *
from keras.optimizers import *
from keras.applications import VGG16
from keras.applications.vgg19 import preprocess_input
import os
import random
import numpy as np

SHAPE = (224, 224, 3)


def set_seed(seed):
    tf.random.set_seed(seed)
    os.environ['PYTHONHASHSEED'] = str(seed)
    np.random.seed(seed)
    random.seed(seed)


def get_model(model_path, train=True):
    set_seed(33)

    pre_process = Lambda(preprocess_input)
    vgg = VGG16(weights='imagenet', include_top=True, input_shape=SHAPE)
    vgg = Model(vgg.input, vgg.layers[-3].output)
    vgg.trainable = False

    inp = Input(SHAPE)
    vgg_16_process = pre_process(GaussianNoise(0.1)(inp))
    vgg_out = vgg(vgg_16_process)

    noise = Lambda(tf.zeros_like)(vgg_out)
    noise = GaussianNoise(0.1)(noise)

    if train:
        x = Lambda(lambda z: tf.concat(z, axis=0))([vgg_out, noise])
        x = Activation('relu')(x)
    else:
        x = vgg_out

    x = Dense(512, activation='relu')(x)
    x = Dense(256, activation='relu')(x)
    out = Dense(2, activation='softmax')(x)

    model = Model(inp, out)
    model.compile(Adam(lr=1e-4), loss='binary_crossentropy')

    model.load_weights(model_path)

    return model


def give_prediction(picture, model):
    categories = ["Dish", "Non_dish"]

    img = tf.keras.utils.load_img(picture, target_size=(SHAPE[0], SHAPE[1]))
    x = tf.keras.utils.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    images = np.vstack([x])
    prediction = model.predict(images, batch_size=10)
    if prediction[0][1] == 1:
        return categories[0]
    else:
        return categories[1]
