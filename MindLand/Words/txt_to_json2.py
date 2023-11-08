import json

txt_filename = "reciC.txt"
json_filename = "izlazniReci.json"

# Čitanje nizova iz txt fajla
with open(txt_filename, "r", encoding="utf-8") as txt_file:
    words = [line.strip() for line in txt_file.readlines()]

# Pretvaranje nizova u JSON format
data = {"reci": words}

# Upisivanje u JSON fajl
with open(json_filename, "w", encoding="utf-8") as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)

print(f"Fajl {txt_filename} je uspešno pretvoren u JSON fajl {json_filename}.")