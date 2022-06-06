import os
import json
import re
os.chdir('..')
with open("data/recipes/amounts.json", encoding="utf-8") as f:
    amounts = json.load(f)

re1 = re.compile(r"^([\d½¼¾⅛]+(?: [½¼¾⅛])?(?:,\d+)?)(?: ((?:kl\. |gr\. )?\w+(?:, gestr\.|, gehäuft)?)(?:/n|/e|\(n\)|\(e\)|\.)?)?$")
re_singol = re.compile(r"^(kl. |gr. )?(Tasse|mg|ml|Tüte|Kopf|Stück|Spritzer|Teil|Becher|Blatt|Zehe|Blätter|Bund|Dose|[ET]L(,.*)?|cl|dl|Flasche|Fläschchen|Glas|Gläser|Handvoll|Körner|Liter|Msp.|Paar|Paket|Pck.|Pkt.|Port.|Prise.*|Scheibe)(/[en])?$")

replacings = "gestr.=gestrichen,geh.=gehäuft,m.-große=mittelgroße,m.-großer=mittelgroßer,TL=Teelöffel,Eßlöffel=Esslöffel,EL=Esslöffel,Msp.=Messerspitze,Pck.=Packung,Pkt.=Packung,Port.=Portion,kl.=kleine,gr.=große".split(",")

replacings = {ee.split("=")[0]: ee.split("=")[1] for ee in replacings}

parsed1 = []
for _amount in amounts:
    amount = _amount
    if amount == "":
        amount = "1"
    #amount = amount.replace("m.-große", "mittelgroße")
    if re_singol.match(amount):
        amount = "1 " + amount
    for bef, aft in replacings.items():
        amount = re.sub(r"\b" + re.escape(bef) + r"(\b|$)", aft, amount)
    m = re1.match(amount)
    if m is not None:
        parsed1.append((_amount, *m.groups()))
    else:
        print("UNMATCHED  ", _amount, amount)
        parsed1.append((_amount, None, None))

re_num = re.compile(r"([\d½¼¾⅛]+)(?: ([½¼¾⅛]))?(?:,(\d+))?")

def parse_num(amount, unit):
    if amount is None:
        return (None, None)
    fs = {"½": 1/2, "¼": 1/4, "¾": 3/4, "⅛": 1/8}
    whole, addition, fraction = re_num.match(amount).groups()
    whole = fs[whole] if whole in fs else int(whole)
    addition = fs[addition] if addition is not None else 0
    fraction = float("0." + fraction) if fraction is not None else 0
    total_amount = whole + addition + fraction
    if unit == "kg":
        unit = "g"
        total_amount *= 1000
    if unit == "mg":
        unit = "g"
        total_amount /= 1000
    if unit and (unit.lower() == "l" or unit.lower() == "liter"):
        unit = "ml"
        total_amount *= 1000
    if unit == "cl":
        unit = "ml"
        total_amount *= 10
    if unit == "dl":
        unit = "ml"
        total_amount *= 100
    return total_amount, unit

parsed_amounts = {orig: parse_num(n, e) for orig, n, e in parsed1}

with open("data/recipes/parsed_amounts.json", "w") as f:
    json.dump(parsed_amounts, f)