from flask import Flask, json
from flask import request, jsonify
import time
from flask_cors import CORS

import mysql.connector
from math import floor

time.sleep(60)

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True
# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
# cors = CORS(app, resources={r"/books": {"origins": "http://localhost:port"}})
adminPass = "He11obitches"
mydb = None
mycursor = None
# era db inainte
mydb = mysql.connector.connect(
		host = "db",
		user = "root",
		passwd = "parola",
		database = "store",
		port = "3306"
	)
# mydb = mysql.connector.connect(
# 		host = "localhost",
# 		user = "root",
# 		passwd = "Parolagrea.009",
# 		database = "store"
# 	)
mycursor = mydb.cursor()

@app.route('/account', methods=['POST'])
def new_account():
	global mydb
	global mycursor

	try:
		s = json.loads(request.data, strict = False)

		sql = "select add_account(%s, %s, %s, %s)"
		mycursor.execute(sql, (s["number"], s["email"], s["password"], s["school"]))
		newId = mycursor.fetchone()

		mydb.commit()
	except:
		mydb.rollback()
		return jsonify({"error":True})

	if (newId[0] == -1):
		return jsonify({"error":"True"})

	return jsonify({"result":newId[0]})

@app.route('/student', methods=['POST'])
def new_student():
	global mydb
	global mycursor

	try:
		s = json.loads(request.data, strict = False)

		sql = "select add_student(%s, %s, %s, %s)"
		mycursor.execute(sql, (s["name"], s["surname"], s["school"], s["id"]))
		newId = mycursor.fetchone()

		mydb.commit()
	except:
		mydb.rollback()
		return jsonify({"error":True})

	if (newId[0] == -1):
		return jsonify({"error":"True"})

	return jsonify({"result":newId[0]})

@app.route('/item', methods=['POST'])
def new_item():
	global mydb
	global mycursor

	try:
		s = json.loads(request.data, strict = False)

		sql = "select add_item(%s, %s, %s, %s)"
		mycursor.execute(sql, (s["carte"], s["title"], s["author"], s["bucati"]))
		newId = mycursor.fetchone()

		mydb.commit()
	except:
		mydb.rollback()
		return jsonify({"error":True})

	if (newId[0] == -1):
		return jsonify({"error":"True"})

	return jsonify({"result":newId[0]})

@app.route('/school', methods=['POST'])
def new_school():
	global mydb
	global mycursor

	try:
		s = json.loads(request.data, strict = False)

		sql = "select add_school(%s, %s, %s, %s, %s, %s)"
		mycursor.execute(sql, (s["name"],s["street"],s["city"],s["county"],s["number"],s["id"]))
		newId = mycursor.fetchone()

		mydb.commit()
	except:
		mydb.rollback()
		return jsonify({"error":True})

	if (newId[0] == -1):
		return jsonify({"error":"True"})

	return jsonify({"result":newId[0]})

@app.route('/return', methods=['POST'])
def ret():
	global mydb
	global mycursor

	try:
		s = json.loads(request.data, strict = False)

		sql = "select ret(%s)"
		mycursor.execute(sql, (s["id"],))
		newId = mycursor.fetchone()

		mydb.commit()
	except:
		mydb.rollback()
		return jsonify({"error":True})

	return jsonify({"result":"True"})

@app.route('/add', methods=['POST'])
def add():
	global mydb
	global mycursor

	try:
		s = json.loads(request.data, strict = False)

		sql = "select addition(%s, %s)"
		mycursor.execute(sql, (s["nr"], s["id"]))
		newId = mycursor.fetchone()

		mydb.commit()
	except:
		mydb.rollback()
		return jsonify({"error":True})

	return jsonify({"result":"True"})


@app.route('/delaccount', methods=['POST'])
def delAccount():
	global mydb
	global mycursor

	try:
		s = json.loads(request.data, strict = False)

		sql = "select delaccount(%s)"
		mycursor.execute(sql, (s["id"], ))
		newId = mycursor.fetchone()

		mydb.commit()
	except:
		mydb.rollback()
		return jsonify({"error":True})

	return jsonify({"result":"True"})

@app.route('/delperson', methods=['POST'])
def delPerson():
	global mydb
	global mycursor

	try:
		s = json.loads(request.data, strict = False)

		sql = "select delperson(%s)"
		mycursor.execute(sql, (s["id"], ))
		newId = mycursor.fetchone()

		mydb.commit()
	except:
		mydb.rollback()
		return jsonify({"error":True})

	return jsonify({"result":"True"})

@app.route('/delschool', methods=['POST'])
def delSchool():
	global mydb
	global mycursor

	try:
		s = json.loads(request.data, strict = False)

		sql = "select delschool(%s)"
		mycursor.execute(sql, (s["id"], ))
		newId = mycursor.fetchone()

		mydb.commit()
	except:
		mydb.rollback()
		return jsonify({"error":True})

	return jsonify({"result":"True"})

@app.route('/delitem', methods=['POST'])
def delItem():
	global mydb
	global mycursor

	try:
		s = json.loads(request.data, strict = False)

		sql = "select delitem(%s)"
		mycursor.execute(sql, (s["id"], ))
		newId = mycursor.fetchone()

		mydb.commit()
	except:
		mydb.rollback()
		return jsonify({"error":True})

	return jsonify({"result":"True"})

@app.route('/schools', methods=['POST'])
def get_schools():
	global mydb
	global mycursor

	mycursor.callproc("sel_schools");
	records = mycursor.stored_results()
	schools = []

	for rec1 in records:
		for rec in rec1.fetchall():
			schools.append({"id": rec[0], 
				"name": rec[1], 
				"street": rec[2], 
				"nr": rec[3], 
				"city": rec[4], 
				"county": rec[5]})

	return jsonify({"result":schools})

@app.route('/people', methods=['POST'])
def get_people():
	global mydb
	global mycursor

	people = []
	mycursor.callproc("sel_students");
	rez = mycursor.stored_results()

	for records in rez:
		for rec in records.fetchall():
			print (rec)
			schoolId = rec[1]

			mycursor.callproc("sel_schools_one", [schoolId,]);
			records2 = mycursor.stored_results()
			
			for rec1 in records2:
				for school in rec1.fetchall():
					people.append({"id": rec[0], 
						"name": rec[2], 
						"surname": rec[3], 
						"school": school[1], 
						"address": str(school[2]) + ", " 
								+ str(school[3]) + ", " 
								+ str(school[4]) + ", " 
								+ str(school[5])})
	return jsonify({"result":people})


@app.route('/msg', methods=['POST'])
def get_msg():
	global mydb
	global mycursor

	msg = []
	mycursor.callproc("sel_accmsg");
	rez = mycursor.stored_results()

	for records in rez:
		for rec in records.fetchall():
			print (rec)
			schoolId = rec[1]

			msg.append({"msg": rec[0], 
				"id": rec[1], 
				"date": rec[2]})

	return jsonify({"result":msg})



@app.route('/accounts', methods=['POST'])
def get_accounts():
	global mydb
	global mycursor
	accounts = []

	mycursor.callproc("sel_accounts");
	rez = mycursor.stored_results()

	for records in rez:
		for rec in records.fetchall():
			personId = rec[0]	

			mycursor.callproc("sel_students_one", [personId,])
			rez2 = mycursor.stored_results()
			for records2 in rez2:
				for person in records2.fetchall():

					print (rec)
					accounts.append({"id": rec[0], 
						"name": person[2], 
						"surname": person[3], 
						"email": rec[1]})

	return jsonify({"result":accounts})

@app.route('/login', methods=['POST'])
def login():
	global mydb
	global mycursor

	try:
		s = json.loads(request.data, strict = False)

		sql = "select login(%s, %s)"
		mycursor.execute(sql, (s["email"], s["password"]))
		newId = mycursor.fetchone()

		mydb.commit()
	except:
		mydb.rollback()
		return jsonify({"error":True})

	if (newId[0] == -1):
		return jsonify({"error":"True"})

	return jsonify({"result":newId[0]})


@app.route('/rezervations', methods=['POST'])
def get_rezervations():
	global mydb
	global mycursor

	s = json.loads(request.data, strict = False)
	entries = []

	mycursor.callproc("sel_act_one", [s,]);
	rez = mycursor.stored_results()

	for records in rez:
		for rec in records.fetchall():

			bookId = rec[2];

			mycursor.callproc("sel_items_one", [bookId,])
			rez2 = mycursor.stored_results()

			for records2 in rez2:
				for book in records2.fetchall():	

					print (rec[3])
					data = str(rec[3])
					entries.append({"id": rec[0], 
						"title": book[1], 
						"author": book[2], 
						"date": data})

	return jsonify({"result":entries})


@app.route('/admin/rezervations', methods=['POST'])
def get_admin_rezervations():
	global mydb
	global mycursor

	# s = json.loads(request.data, strict = False)

	sql = "select * from activity"
	mycursor.execute(sql)
	records = mycursor.fetchall()	
	entries = []

	for rec in records:

		bookId = rec[2]

		sql = "select * from items2 where id=%s"
		mycursor.execute(sql, (bookId,))
		book = mycursor.fetchone()

		personId = rec[1]	

		sql = "select * from students where id=%s"
		mycursor.execute(sql, (personId,))
		person = mycursor.fetchone()

		schoolId = person[1]

		mycursor.callproc("sel_schools_one", [schoolId,]);
		records2 = mycursor.stored_results()
		
		for rec1 in records2:
			for school in rec1.fetchall():

				print (rec[3])
				data = str(rec[3])
				entries.append({"id": rec[0], 
					"name":person[2],
					"surname":person[3],
					"school":school[1],
					"address":str(school[2]) + ", " 
							+ str(school[3]) + ", " 
							+ str(school[4]) + ", " 
							+ str(school[5]),
					"title": book[1], 
					"author": book[2], 
					"date": data})

	return jsonify({"result":entries})


@app.route('/items', methods=['POST'])
def get_items():
	global mydb
	global mycursor

	# s = json.loads(request.data, strict = False)

	mycursor.callproc("sel_items");
	records2 = mycursor.stored_results()
	entries = []
	for rec1 in records2:
		for rec in rec1.fetchall():
			entries.append({"id": rec[0], 
				"title": rec[1], 
				"author": rec[2], 
				"nr": rec[3]})

	return jsonify({"result":entries})


@app.route('/reserve', methods=['POST'])
def rezerve():
	global mydb
	global mycursor

	s = json.loads(request.data, strict = False)

	sql = "select reserve(%s, %s)"
	mycursor.execute(sql, (s["id"], s["book"]))
	records = mycursor.fetchall()	
	mydb.commit()

	return jsonify({"result":"success"})

@app.route('/admin/login', methods=['POST'])
def admin_login():
	global mydb
	global mycursor

	s = json.loads(request.data, strict = False)

	if s["password"] == adminPass:
		return jsonify({"result":"success"})
	else:
		return jsonify({"error":"hei"})


@app.route('/', methods=['POST'])
def hello():
    return "Hello World!"


if __name__ == '__main__':
	app.run(host='0.0.0.0')
	# app.run()
