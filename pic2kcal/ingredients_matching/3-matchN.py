import json
import re
import random
from tqdm import tqdm
import os
from util import normalize_out_ingredient
from collections import defaultdict
from operator import itemgetter
import pandas as pd
from IPython.display import HTML, display
from html import escape

os.chdir('..')
with open("data/fddb_data_withimg.json", encoding='utf-8') as f:
	fddb = json.load(f)
with open("data/recipe-ingredient-to-fooddb.json") as f:
	all_ings_orig = json.load(f)

custom_amounts = {("Öl", "Olivenöl"): ["UNK (20 ml)", "etwas (20 ml)", "Esslöffel (10 ml)"], # 2EL = 20ml
				  ("Salz",): ["UNK (2 g)"],
				  ("Paprikapulver", ): ["UNK (2 g)"], # prevent Paprikasalami
				  ("Zucker",): ["UNK (2 g)"],
				 }

custom_amounts = {ks: v for k, v in custom_amounts.items() for ks in k}

def normalize_amount_unit(unit):
	if re.match(r"^mittelgroße[sre]?$", unit):
		return "mittelgroß"
	if unit == "Dose (Abtropfgewicht)":
		return "Dose"
	return unit


fddb_entries = defaultdict(list)
rem = re.compile(r"^(\d+ )?(.*) \((\d+(?:,\d+)?) (g|ml)\)$")
def handle_fddb():
	for e in tqdm(fddb):
		for ning in normalize_out_ingredient(e["name"]):
			fddb_entries[ning].append(e)
		sanity = list(e["Standard Nährwerte"].keys())
		snmatchs = [re.match("^Nährwerte für 100 (\w+)$", s) for s in sanity]
		snmatchs = [x for x in snmatchs if x is not None]
		if len(snmatchs) == 1:
			unn = snmatchs[0].groups()[0]
			e["parsed"] = {"unit": unn, "for_100": e["Standard Nährwerte"]["Nährwerte für 100 {}".format(unn)]}

		else:
			print("SANITY ERROR:", e["Id"], sanity, unit, snmatch)
			continue
		amts = e["parsed"]["amounts"] = []
		spec_keys = list(e["Spezifische Nährwerte"].keys())
		if e["name"] in custom_amounts:
			spec_keys += custom_amounts[e["name"]]
		for k in spec_keys:
			if k == "100 g (100 g)" or k == "100 g (100 ml)" or k == "100 ml (100 ml)":
				continue
			txtamount, txt, amount, unit = rem.match(k).groups()
			amount = float(amount.replace(",", "."))
			txtamount = float(txtamount.replace(",", ".")) if txtamount else 1.0
			txt = normalize_amount_unit(txt)
			amts.append((txt, k, amount/txtamount))
			if unn != unit:
				pass
				#raise Exception("noooo " + unn + " " + unit, e["name"])
			#print(txt, amount/txtamount, unit)
handle_fddb()



# get recipe meta
with open("data/recipes/processed_data.json", encoding="utf-8") as f:
	recipes = json.load(f)

# get amount map from parse-amounts
with open("data/recipes/parsed_amounts.json") as f:
	parsed_amounts = json.load(f)

# only recipes with pictures
recipes = [recipe for recipe in recipes if len(recipe['picture_files']) > 0]

pd.set_option('display.max_colwidth', None)
debug=False
	
def match_amts(*, ing_matches, have_count, have_unit):
	possible_entries = {entry["Id"]: (ing_match[1], entry) for ing_match in ing_matches for entry in fddb_entries[ing_match[0]]}
	possible_entries = sorted(list(possible_entries.values()), key=lambda e: -e[0])
	have_unit = [normalize_amount_unit(unit) for unit in have_unit]
	for accuracy, e in possible_entries:
		if "parsed" not in e:
			continue
		debug and print("considering", e["name"], e["Id"])
		want_unit = e["parsed"]["unit"]

		if want_unit in have_unit:
			debug and print("got direct match!", have_count, have_unit, have_count, want_unit)
			return (e, accuracy, have_count, want_unit, have_count, want_unit)
		for amount_name, amount_source, to_norm in e["parsed"]["amounts"]:
			debug and print(e["name"], "amount", amount_source)
			if amount_name in have_unit:
				debug and print("got match unit!", amount_source)
				return (e, accuracy, have_count, have_unit[0], have_count*to_norm, want_unit)

def match_ingredient(ingredient):
	output = {"original": ingredient, "type": "ingredient" if "amount" in ingredient else "subtitle"}
	if output["type"] == "ingredient":
		amount_count, amount_type = parsed_amounts[ingredient["amount"]]

		if amount_count is None: # only happens when both amount_count and amount_type is None (else it is set to 1)
			#return cols + ["[ignored]"]
			output["matched"] = {"matched": False, "important": False, "message": "[unimportant]"}
			return output
			#amount_count = 1
			#amount_type = ["UNK"]
		if amount_type is None:
			amount_type = ["Stück", "mittelgroß", "UNK"]
		elif amount_type in ["dicke", "dicker"]:
			amount_type = [amount_type, "große", "großer"]
		else:
			amount_type = [amount_type]
		#print("[" + str(amount_count) + "*" + (amount_type)+ "] of ", end="")
		_ing_matches = all_ings_orig[ingredient["ingredient"]]
		# all matches better than 84% or the first one if it's worse
		ing_matches = [e for e in _ing_matches if e[1] > 0.84]
		if len(ing_matches) == 0:
			# not so great match but eh
			ing_matches = [_ing_matches[0]]

		debug and print("matches", ing_matches)
		debug and print("finding unit ", amount_type)
		match = match_amts(ing_matches=ing_matches, have_count=amount_count, have_unit=amount_type)

		if not match:
			message = "[no amount for match for [{}] on [{}]]".format("|".join(amount_type), "|".join(t for t, _ in ing_matches))
			# important if calorie dense (>100kcal/100g)
			important = fddb_entries[ing_matches[0][0]][0]["parsed"]["for_100"]["Kalorien"]["Menge"] > 100
			if not important:
				message = "[unimportant]" + message
			output["matched"] = {"matched": False, "important": important, "message": message}
		else:
			fddb_entry, accuracy, count_weird, unit_weird, count_norm, unit_norm = match
			output["matched"] = {
				"matched": True,
				"match_accuracy": accuracy,
				"weird": {"count": count_weird, "unit": unit_weird},
				"normal": {"count": count_norm, "unit": unit_norm},
				"name": fddb_entry["name"],
				"id": fddb_entry["Id"],
				"multiplier": count_norm / 100,
				"nutritional_values": fddb_entry["parsed"]["for_100"] #parse_nutritional_values(values)
			}
	return output

def disp_ing(ing):
	if ing["type"] == "ingredient":
		cols = [ing["original"]["amount"], ing["original"]["ingredient"], "="]
		p = ing["matched"]
		if not p["matched"]:
			return cols + [p["message"]]

		weird = p["weird"]
		norm = p["normal"]
		if weird["unit"] == norm["unit"]:
			unittxt = "{}{}".format(norm["count"], norm["unit"])
		else:
			unittxt = "{} {} = {}{}".format(weird["count"], weird["unit"], norm["count"], norm["unit"])
		values = p["nutritional_values"]
		value_kcal_per_100 = values["Kalorien"]["Menge"]
		value_kcal = value_kcal_per_100 * p["multiplier"]
		cols.append("({:.0f}%) [{}] of {} = {:.0f} kcal".format(p["match_accuracy"] * 100, unittxt, p["name"], value_kcal))
		return cols
	elif ing["type"] == "subtitle":
		return ["->>" + ing["original"]["subtitle"]]



def sum_nutritional_values(ings):
	out_vals = defaultdict(lambda: {"Menge": 0, "Einheit": None})
	for ing in ings:
		if ing["type"] != "ingredient":
			continue
		if not ing["matched"]["matched"]:
			if ing["matched"]["important"]:
				return None
			else:
				continue
		nutritional_values = ing["matched"]["nutritional_values"]
		multiplier = ing["matched"]["multiplier"]
		for k, v in nutritional_values.items():
			o = out_vals[k]
			o["Menge"] += v["Menge"] * multiplier
			bef_unit = o["Einheit"]
			if bef_unit is None:
				o["Einheit"] = v["Einheit"]
			if o["Einheit"] != v["Einheit"]:
				print(o, v)
				raise Exception("Unit mismatch")
	return out_vals

def match_recipe(recipe):
	ings = [match_ingredient(ing) for ing in recipe["ingredients"]]
	summed_nut = sum_nutritional_values(ings)
	if summed_nut is not None:
		nut = {
		"per_portion": {k: {**v, "Menge": v["Menge"] / float(recipe["portions"])} for k, v in summed_nut.items()},
		"per_recipe": summed_nut
	}
	else:
		nut = None
	return {**recipe, "ingredients": ings, "nutritional_values": nut}
y = 0
n = 0
for r in recipes:
	#print(r)
	#print("##############################")
	#print(match_recipe(r)["nutritional_values"])
	#print("XXXXXXXXXXXXXXXXXXXXXXXXX")
	if match_recipe(r)["nutritional_values"] == None:
		n+=1
	else:
		y+=1
print(len(recipes))
print(y)
print(n)

def display_recipe(recipe):
	display(HTML("<h2>{}</h2>".format(escape(recipe["title"]))))
	ings = match_recipe(recipe)["ingredients"]
	#print(ings)

	ings_df = pd.DataFrame([disp_ing(ing) for ing in ings], columns=["inp amount", "inp ing", "", "paredd"])
	display(HTML(ings_df.to_html()))
									  
#for recipe in random.sample(recipes, 20):
#	print(recipe)
#	display_recipe(recipe)

unm_ings = []
for recipe in random.sample(recipes, 100):
    recipe = match_recipe(recipe)
    for ing in recipe["ingredients"]:
        if ing["type"] == "ingredient" and not ing["matched"]["matched"]:
            if ing["matched"]["important"]:
                unm_ings.append(ing)

#with pd.option_context('display.max_colwidth', 80):
#    ings_df = pd.DataFrame([disp_ing(ing) for ing in unm_ings], columns=["inp amount", "inp ing", "", "paredd"])
#    display(HTML(ings_df.to_html()))



with open("data/recipes/recipes_matched.jsonl", "w", buffering=2**20) as f:
    debug=False
    for recipe in tqdm(recipes):
        json.dump(match_recipe(recipe), f)
        f.write("\n")

print(fddb_entries["Ei, vom Huhn"])

print(normalize_out_ingredient("Ei, vom Huhn"))

print(match_ingredient({"amount": "1 Pck.", "ingredient": "Backpulver"}))

z = fddb_entries["Backpulver"][2]["parsed"]["for_100"]["Kalorien"]["Menge"]

#print(match_ingredient({"amount": "1", "ingredient": "Schalotte(n)"}))

#print(match_ingredient({"amount": "1 Glas", "ingredient": "Schattenmorellen"}))


print(match_ingredient({"amount": "3 m.-große", "ingredient": "Ei(er)"}))

print(match_ingredient({"amount": "", "ingredient": "Olivenöl"}))

print(all_ings_orig["Karotte(n)"])