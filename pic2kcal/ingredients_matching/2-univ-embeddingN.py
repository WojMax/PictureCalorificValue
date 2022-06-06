import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import tensorflow_text
from pathlib import Path
import json
import re
import random
import heapq
from operator import itemgetter
from tqdm import tqdm
from math import ceil
import os
from multiprocessing import Pool, cpu_count
from util import normalize_out_ingredient

data_dir = Path("data")
embed = hub.load("https://tfhub.dev/google/universal-sentence-encoder-multilingual-large/3")


os.chdir('..')

with open(str(data_dir / "fddb_data_withimg.json"), encoding='utf-8') as f:
	fddb = json.load(f)
	# todo: make unique here
	_out_names = [e["name"] for e in fddb]

# jq '.ingredients[]|select(.ingredient)|.ingredient' processed_data.jsonl | jq -s unique > ingredients.json
with open(str(data_dir / "recipes/ingredients.json"), encoding='utf-8') as f:
	_in_names = json.load(f)


def normalize_ingredient(ing: str):
	# ing = re.sub(r"\(([^)])\)", "\g<1>", ing)  # remove stuff in parens
	ing = re.sub(r"\([^)]+\)", "", ing)  # remove stuff in parens
	ing = re.sub(r"(\d+,)?\d+ k?g\b", "", ing)  # remove xyz gram
	ing = re.sub(r",.*", "", ing) # TODO: DONT DO THIS! SIGNIFICANT INFORMATION LOSS
	ing = re.sub(r"\bzum .*", "", ing)
	ing = re.sub(r"\bfür .*", "", ing)
	ing = re.sub(r"\boder\b.*", "", ing)
	ing = ing.strip()
	return ing


in_names = list({normalize_ingredient(ing) for ing in _in_names})
print(len(_in_names))
in_names.sort()
print(len(in_names))

print(len(_out_names))
out_names = list({ning for ing in _out_names for ning in normalize_out_ingredient(ing)})
out_names.sort()
print(len(out_names))


def make_chunks(l, n):
	n = max(1, n)
	return (l[i:i+n] for i in range(0, len(l), n))

def get_sentence_vectors(texts):
	bs = 1000
	ccount = len(texts)//bs
	chunks = make_chunks(texts, bs)
	for chunk in tqdm(chunks, total=ccount):
		yield from embed(chunk)

def get_match(search: np.array, out_vecs, limit=30):
	it = ((v[0], np.dot(v[1], search)) for v in out_vecs)
	res_list = heapq.nlargest(limit, it, key=itemgetter(1))
	return res_list

out_vecs = list(zip(out_names, get_sentence_vectors(out_names)))

print(out_vecs[0][1].shape)

print(in_names[0], out_names[0])

in_vecs = list(zip(in_names, get_sentence_vectors(in_names)))


'''
for ingredient, vec in random.sample(in_vecs, 100):
	res_list = get_match(vec, out_vecs)
	print("{} -> {}".format(ingredient, res_list[0]))

z = [inv for inv in in_vecs if inv[0] == 'Hefe'][0]
print("1")
for line in get_match(z[1], out_vecs):
	print(line)
print("2")
z = list(get_sentence_vectors(["Malz"]))[0]
for line in get_match(z, out_vecs, limit=30):
	print(line)
print("3")
z = list(get_sentence_vectors([normalize_ingredient("Salz")]))[0]
for line in get_match(z, out_vecs, limit=30):
	print(line)'''

def jsonable(e):
	return [(a,float(b)) for a, b in e]

def get_match_w(t):
	ing, vec = t
	return ing, get_match(vec, out_vecs)

all_ings = {}
for t in in_vecs:
	ing, match = get_match_w(t)
	all_ings[ing] = jsonable(match)

all_ings_orig = {ing: all_ings[normalize_ingredient(ing)] for ing in _in_names}
print(all_ings_orig)
with open("data/recipe-ingredient-to-fooddb.json", "w", encoding='utf-8') as f:
	json.dump(all_ings_orig, f)