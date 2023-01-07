import tensorflow as tf
from tensorflow import keras
from keras import Model
from keras.layers import Dense, Flatten, Dropout
from keras.applications.inception_v3 import InceptionV3
import numpy as np

SHAPE = (299, 299, 3)


def get_model(model_path):
    base_model = InceptionV3(weights='imagenet', include_top=False, input_shape=SHAPE)

    x = base_model.output
    x = Flatten()(x)
    x = Dense(1024, activation='relu')(x)
    x = Dropout(0.5)(x)
    predictions = Dense(10, activation='softmax')(x)

    model = Model(inputs=base_model.input, outputs=predictions)
    model.compile(optimizer=keras.optimizers.SGD(learning_rate=0.0001, momentum=0.9), loss='categorical_crossentropy',
                  metrics=['accuracy'])

    model.load_weights(model_path)

    return model


def give_prediction(picture, model):
    categories = ["bruschetta", "cappelletti", "gnocchi", "lasagne", "panna_cotta", "pizza", "ravioli", "risotto",
                  "spaghetti", "tiramisu"]

    img = tf.keras.utils.load_img(picture, target_size=(SHAPE[0], SHAPE[1]))
    x = tf.keras.utils.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    images = np.vstack([x])
    prediction = model.predict(images, batch_size=10)

    return categories[np.argmax(prediction[0])]
