create database petnest;

use petnest;

create table animais_perdidos(
id int not null auto_increment primary key not null,
nome_sinalizador varchar(255) not null,
telefone varchar(20) not null,
sexo enum('M','F') not null,
tipo varchar(15) not null,
porte varchar (15) not null,
descricao text not null,
link_foto varchar(255) not null,
rua varchar (255) not null,
numero varchar(10) not null,
bairro varchar(40) not null,
cidade varchar(20) not null,
estado char(2) not null,
cep varchar(9) not null
);

