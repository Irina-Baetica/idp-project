-- DROP TABLE accounts;
-- DROP TABLE schools;
-- DROP TABLE students;
-- DROP TABLE items2;
-- DROP TABLE activity;
-- DROP TABLE accountmsg;
DROP DATABASE IF EXISTS store;
CREATE DATABASE store;
USE store;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS schools;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS items2;
DROP TABLE IF EXISTS activity;
DROP TABLE IF EXISTS accountmsg;

CREATE TABLE accounts 
       (id int(4),
       	email varchar(20),
       	password varchar(20),
        PRIMARY KEY (id) 
);

CREATE TABLE schools
       (id int(4),
       	name varchar(100),
       	street varchar(100),
       	nr int(4),
       	city varchar(50),
       	county varchar(50), 
        PRIMARY KEY (id) 
);

CREATE TABLE students
       (id int(4),
       	school int(4),
       	name varchar(50),
       	surname varchar(50),
        PRIMARY KEY (id, school) 
);

CREATE TABLE items2
		(id int(4),
			title varchar(50),
			author varchar(50),
			nr int(4),
			PRIMARY KEY(id)
);

CREATE TABLE activity
		(comm int(4),
			id int(4),
			book int(4),
			data date,
			PRIMARY KEY(comm)
);

CREATE TABLE accountmsg
		(msg varchar(100),
			id int(4),
			data date
);

DROP TRIGGER IF EXISTS usersinfo;
DELIMITER $$
CREATE TRIGGER usersinfo
AFTER INSERT
   ON accounts FOR EACH ROW

BEGIN

   insert into accountmsg values("Cont nou", NEW.id, (select sysdate()));

END
$$
DELIMITER ;

DROP TRIGGER IF EXISTS usersinfodel;
DELIMITER $$
CREATE TRIGGER usersinfodel
BEFORE DELETE
   ON accounts FOR EACH ROW

BEGIN

   insert into accountmsg values("Stergere cont", OLD.id, (select sysdate()));

END
$$
DELIMITER ;

INSERT INTO students VALUES (720, 2, "Ionescu", "Marcel");
INSERT INTO students VALUES (766, 2, "Popescu", "Dorel");
INSERT INTO students VALUES (180, 3, "Balta", "George");
INSERT INTO students VALUES (345, 4, "Alexe", "Ionela");

INSERT INTO schools VALUES (1, "Scoala generala nr 4", "Nicolae Iorga", 34, "Bucuresti", "Bucuresti");
INSERT INTO schools VALUES (2, "Scoala generala nr 3", "A.I. Cuza", 12, "Bucuresti", "Bucuresti");
INSERT INTO schools VALUES (3, "Scoala generala nr 2", "Vasile Alecsandri", 54, "Bucuresti", "Bucuresti");
INSERT INTO schools VALUES (4, "Scoala generala nr 1", "Camil Petrescu", 100, "Bucuresti", "Bucuresti");

INSERT INTO items2 VALUES (12, "O poveste", "Mircea", 5);
INSERT INTO items2 VALUES (13, "O alta poveste", "Alina", 5);
INSERT INTO items2 VALUES (14, "De Craciun", "Mos Craciun", 5);

INSERT INTO activity VALUES (1, 720, 14, (select sysdate()));
INSERT INTO activity VALUES (2, 720, 12, (select sysdate()) );

INSERT INTO accounts VALUES (720, "ion@gmail.com", "Alohomora0");

DROP FUNCTION IF EXISTS add_account;

DELIMITER $$
CREATE FUNCTION add_account(new_id int(4), new_email varchar(20), new_password varchar(20), new_school int(4))
	RETURNS 	int(4)
	NOT DETERMINISTIC
	BEGIN
		DECLARE rows int(4);
		DECLARE ret int(4);
		DECLARE maxid int(4);

		SET rows = 0;
		select count(*) into rows from students where id=new_id and school=new_school;
		if rows > 0 then
			insert into accounts values(new_id, new_email, new_password);
			set ret = 1;
		else
			 set ret = -1;
		end if;
		return ret;
	END;
$$
DELIMITER ;

DROP FUNCTION IF EXISTS add_student;

DELIMITER $$
CREATE FUNCTION add_student(new_name varchar(50), new_surname varchar(50),  new_school int(4), new_id int(4))
	RETURNS 	int(4)
	NOT DETERMINISTIC
	BEGIN
		if exists (select * from schools where new_school=id) then
			insert into students values(new_id, new_school,new_name, new_surname);
			return 1;
		end if;
		return -1;
	END;
$$
DELIMITER ;


DROP FUNCTION IF EXISTS add_item;

DELIMITER $$
CREATE FUNCTION add_item(new_id int(4), new_title varchar(50), new_author varchar(50),  new_count int(4))
	RETURNS 	int(4)
	NOT DETERMINISTIC
	BEGIN
		if exists (select * from items2 where new_title=title and new_author=author) then
			insert into students values(new_id, new_school,new_name, new_surname);
			return -1;
		end if;
		insert into items2 values(new_id , new_title, new_author,  new_count);
		return 1;
	END;
$$
DELIMITER ;

DROP PROCEDURE IF EXISTS sel_schools;

DELIMITER $$
CREATE PROCEDURE sel_schools()
	BEGIN
		select * from schools;
	END;
$$
DELIMITER ;


DROP PROCEDURE IF EXISTS sel_students;

DELIMITER $$
CREATE PROCEDURE sel_students()
	BEGIN
		select * from students;
	END;
$$
DELIMITER ;


DROP PROCEDURE IF EXISTS sel_accounts;

DELIMITER $$
CREATE PROCEDURE sel_accounts()
	BEGIN
		select * from accounts;
	END;
$$
DELIMITER ;

DROP PROCEDURE IF EXISTS sel_accmsg;

DELIMITER $$
CREATE PROCEDURE sel_accmsg()
	BEGIN
		select * from accountmsg;
	END;
$$
DELIMITER ;

DROP PROCEDURE IF EXISTS sel_items;

DELIMITER $$
CREATE PROCEDURE sel_items()
	BEGIN
		select * from items2;
	END;
$$
DELIMITER ;

DROP PROCEDURE IF EXISTS sel_items_one;
DELIMITER $$
CREATE PROCEDURE sel_items_one(new_id int(4))
	BEGIN
		select * from items2 where new_id=id;
	END;
$$
DELIMITER ;

DROP PROCEDURE IF EXISTS sel_schools_one;
DELIMITER $$
CREATE PROCEDURE sel_schools_one(new_id int(4))
	BEGIN
		select * from schools where new_id=id;
	END;
$$
DELIMITER ;

DROP PROCEDURE IF EXISTS sel_students_one;
DELIMITER $$
CREATE PROCEDURE sel_students_one(new_id int(4))
	BEGIN
		select * from students where new_id=id;
	END;
$$
DELIMITER ;

DROP PROCEDURE IF EXISTS sel_act_one;
DELIMITER $$
CREATE PROCEDURE sel_act_one(new_id int(4))
	BEGIN
		select * from activity where new_id=id;
	END;
$$
DELIMITER ;

DROP FUNCTION IF EXISTS add_school;

DELIMITER $$
CREATE FUNCTION add_school(new_name varchar(100), new_street varchar(100), new_city varchar(50), new_county varchar(50), new_number int(4),new_id int(4))
	RETURNS 	int(4)
	NOT DETERMINISTIC
	BEGIN
		if exists (select * from schools where new_name = name and new_city=city) then
			return -1;
		end if;
		insert into schools values(new_id,new_name,new_street,new_number,new_city,new_county);
		return 1;
	END;
$$
DELIMITER ;


DROP FUNCTION IF EXISTS login;

DELIMITER $$
CREATE FUNCTION login(new_email varchar(20), new_password varchar(20))
	RETURNS 	int(4)
	NOT DETERMINISTIC
	BEGIN
		DECLARE thisid int(4);

		set thisid = -1;
		select id into thisid from accounts where email=new_email and password=new_password;
		return thisid;
	END;
$$
DELIMITER ;

DROP FUNCTION IF EXISTS reserve;

DELIMITER $$
CREATE FUNCTION reserve(rid varchar(20), rbook varchar(20))
	RETURNS 	int(4)
	NOT DETERMINISTIC
	BEGIN
		DECLARE maxcomm int(4);

		if exists (select * from items2 where id=rbook and nr>0) then
			update items2 set nr=nr-1 where id=rbook;
			select max(comm) into maxcomm from activity;
			insert into activity values(maxcomm+1, rid, rbook, (select sysdate()));
		end if;

		return 1;
	END;
$$
DELIMITER ;

DROP FUNCTION IF EXISTS ret;

DELIMITER $$
CREATE FUNCTION ret(rid int(4))
	RETURNS 	int(4)
	NOT DETERMINISTIC
	BEGIN
		DECLARE bookid int(4);

		select book into bookid from activity where comm=rid;
		delete from activity where comm=rid;
		update items2 set nr=nr+1 where id=bookid;

		return 1;
	END;
$$
DELIMITER ;


DROP FUNCTION IF EXISTS addition;

DELIMITER $$
CREATE FUNCTION addition(addition int(4), rid int(4))
	RETURNS 	int(4)
	NOT DETERMINISTIC
	BEGIN
		DECLARE current int(4);
		DECLARE counter2 int(4);

		select nr into current from items2 where id=rid;
		select count(*) into counter2 from activity where book=rid;


		set current = current + addition;
		if current <= 0 then
			if counter2 > 0 then
				return -1;
			else
				delete from items2 where id=rid;
				return 1;
			end if;
		else
			update items2 set nr=current where id=rid;
		end if;

		return 1;
	END;
$$
DELIMITER ;


DROP FUNCTION IF EXISTS delAccount;

DELIMITER $$
CREATE FUNCTION delAccount(rid int(4))
	RETURNS 	int(4)
	NOT DETERMINISTIC
	BEGIN

		if exists (select * from activity where id=rid) then
			return -1;
		else
			delete from accounts where id=rid;
		end if;

		return 1;
	END;
$$
DELIMITER ;

DROP FUNCTION IF EXISTS delperson;

DELIMITER $$
CREATE FUNCTION delperson(rid int(4))
	RETURNS 	int(4)
	NOT DETERMINISTIC
	BEGIN

		if exists (select * from activity where id=rid) then
			return -1;
		else
			delete from students where id=rid;
		end if;

		return 1;
	END;
$$
DELIMITER ;

DROP FUNCTION IF EXISTS delitem;

DELIMITER $$
CREATE FUNCTION delitem(rid int(4))
	RETURNS 	int(4)
	NOT DETERMINISTIC
	BEGIN

		if exists (select * from activity where book=rid) then
			return -1;
		else
			delete from items2 where id=rid;
		end if;

		return 1;
	END;
$$
DELIMITER ;

DROP FUNCTION IF EXISTS delschool;

DELIMITER $$
CREATE FUNCTION delschool(rid int(4))
	RETURNS 	int(4)
	NOT DETERMINISTIC
	BEGIN

		if exists (select * from students where school=rid) then
			return -1;
		else
			delete from schools where id=rid;
		end if;

		return 1;
	END;
$$
DELIMITER ;
