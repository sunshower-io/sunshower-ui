


create table "USER" (
  id                    binary(16) primary key,
  firstname             varchar(64),
  lastname              varchar(64),
  username              varchar(128),
  password              varchar(128),
  emailAddress          varchar(128)
);


create table ROLE (
  id                  binary(16) primary key,
  authority           varchar(32),
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
