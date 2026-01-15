create database petnest;

use petnest;

create table animais_perdidos(
id int not null auto_increment primary key,
nome_sinalizador varchar(255),
telefone varchar(20),
sexo char(1) check (sexo in ('M','F')),
tipo varchar(15),
porte varchar (15),
descricao text,
link_foto varchar(255),
rua varchar (255),
numero varchar(10),
bairro varchar(40),
cidade varchar(20),
estado char(2),
cep varchar(9)
);

