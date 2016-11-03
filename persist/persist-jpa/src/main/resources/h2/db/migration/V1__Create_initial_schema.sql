


create table "USER" (
  id                    binary(16) primary key,
  firstname             varchar(64),
  lastname              varchar(64),
  username              varchar(128) unique not null,
  password              varchar(128),
  emailAddress          varchar(128) unique not null,
);


create table ROLE (
  id                  binary(16) primary key,
  authority           varchar(32) unique not null,
  description         varchar(128),
  parent_id           binary(16)
);



create table USERS_TO_ROLES (
  user_id             binary(16),
  role_id             binary(16),

  foreign key (role_id)  references   ROLE(id),
  foreign key (user_id)  references   "USER"(id)
);


create table PERMISSION (
  id              binary(16) primary key,
  name            varchar(32),
  description     varchar(128),
);


create table ROLES_TO_PERMISSIONS (
  id                binary(16),
  role_id           binary(16),
  permission_id     binary(16),

  foreign key (role_id)         references    ROLE(id),
  foreign key (permission_id)   references    PERMISSION(id)

);

create table VERSION (
  id                  integer identity primary key,
  major               integer,
  minor               integer,
  minor_minor         integer,
  extension           varchar(32),
);

create table APPLICATION (
  id                binary(16) primary key,
  enabled           boolean,
  "name"            varchar(128),
  instance_id       varchar(32),
  location          varchar(32),
  started_on        timestamp,
  last_shutdown     timestamp,

  version_id        integer,

  foreign key(version_id)       references VERSION(id)

);


create table CREDENTIAL_METADATA (
  id            binary(16) primary key,
  key           varchar(32),
  value         varchar(128)
);


create table CREDENTIAL_SECRET (
  id              binary(16) primary key,
  name            varchar(32),
  secret          varchar(8192),
  description     varchar(512),
  created         timestamp,
  updated         timestamp default CURRENT_TIMESTAMP,
  modifier_id     binary(16),
  metadata_id     binary(16),

  foreign key (modifier_id) references "USER"(id),
  foreign key (metadata_id) references CREDENTIAL_METADATA(id)
);


create table METADAtA_VALUE (

  id      binary(16) primary key,
  key     varchar(128),
  value   varchar(128)
);