from pymongo import MongoClient

file_path = "reciC.txt"

encodings_to_try = ['utf-8', 'cp1252', 'latin-1', 'iso-8859-1']

for encoding in encodings_to_try:
    try:
        with open(file_path, "r", encoding=encoding) as file:
            words = file.read().splitlines()
        break
    except UnicodeDecodeError:
        pass

client = MongoClient("mongodb://localhost:27017/")
db = client["Mindland"]
collection = db["reci"]

for word in words:
    collection.insert_one({"rec": word})