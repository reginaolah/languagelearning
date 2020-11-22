insert into user (id, username, email, password, first_name, last_name, role, created_at, updated_at) values ('1', 'barna', 'almafa','kbarna@elte.hu', 'user', 'user', 'TEACHER', 20201030, 20201030);
insert into user (id, username, email, password, first_name, last_name, role, created_at, updated_at) values ('2', 'regina', 'körtefa','oregina@elte.hu', 'user', 'user', 'TEACHER', 20201030, 20201030);
insert into language(id, language_code, language) values ('1', 'en', 'english');
insert into language(id, language_code, language) values ('2', 'es', 'spanish');
insert into user_languages(user_id, language_id) values (1,1);
insert into lesson(id, title, price, teacher_id) values ('1', 'lesson1', 1400, '3');
