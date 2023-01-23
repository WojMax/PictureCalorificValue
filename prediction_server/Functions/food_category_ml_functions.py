import tensorflow as tf
from tensorflow import keras
from keras import Model
from keras.layers import Dense, Flatten, Dropout, GlobalAveragePooling2D

import numpy as np
import os
import random
import scipy

from keras.applications.inception_resnet_v2 import InceptionResNetV2
from keras.preprocessing.image import ImageDataGenerator

SHAPE = (299, 299, 3)


def set_seed(seed):
    tf.random.set_seed(seed)
    os.environ['PYTHONHASHSEED'] = str(seed)
    np.random.seed(seed)
    random.seed(seed)


def get_model(model_path):
    base_model = InceptionResNetV2(weights='imagenet', include_top=False, input_shape=SHAPE)

    base_model.trainable = True

    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(256, activation='relu')(x)
    predictions = Dense(10, activation='softmax')(x)

    model = Model(inputs=base_model.input, outputs=predictions)

    model.compile(optimizer=keras.optimizers.Adam(learning_rate=1e-5), loss='categorical_crossentropy',
                  metrics='accuracy')

    model.load_weights(model_path)

    return model


def give_prediction(model):
    directory = 'Predict'
    
    test_datagen = ImageDataGenerator(rescale=1. / 255)
    test_generator = test_datagen.flow_from_directory(
        directory,
        target_size=(SHAPE[0], SHAPE[1]),
        class_mode=None,
        shuffle=False,
        batch_size=1)  # set as testing data

    categories = ["bruschetta", "cappelletti", "gnocchi", "lasagne", "panna_cotta", "pizza", "ravioli", "risotto",
                  "spaghetti", "tiramisu"]
    calories = [173, 307, 170, 192, 157, 266, 217, 226, 143, 335]

    predict = model.predict(test_generator, steps=1)

    return categories[np.argmax(predict[0])], calories[np.argmax(predict[0])]
