


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

create table METADATA_VALUE (
  id        binary(16) primary key,
  key       varchar(128),
  value     varchar(256)
);



create table CREDENTIAL_METADATA (
  id            binary(16) primary key,
  metadata_id   binary(16) references METADATA_VALUE(id)
);

create table CREDENTIAL_SECRET (
  id              binary(16) primary key,
  name            varchar(32),
  secret          varchar(8192),
  description     varchar(512),
  credential      varchar(1024),
  created         timestamp,
  updated         timestamp default CURRENT_TIMESTAMP,
  modifier_id     binary(16),
  metadata_id     binary(16),

  foreign key (modifier_id) references "USER"(id),
  foreign key (metadata_id) references CREDENTIAL_METADATA(id)
);


create table INSTANCE_DESCRIPTOR_METADATA (
  id                 binary(16) primary key,
  instance_id        binary(16)
);


create table INSTANCE_METADATA_VALUE (
  id      binary(16) primary key,
  key     varchar(128),
  value   varchar(128)
);


create table CLOUD_PROVIDER (
  id            binary(16) primary key,
  icon          varchar(256),
  name          varchar(128),
  description   varchar(256),
);



create table COST_PROFILE (
    id        binary(16) primary key,
);

create table MEMORY_PROFILE (
    id        binary(16) primary key,
);

create table NETWORK_PROFILE (
    id        binary(16) primary key,
);


create table COMPUTE_PROFILE (
    id        binary(16) primary key,
    cores     int
);


create table SOFTWARE_PROFILE (
    id      binary(16) primary key,
    cores   int
);


create table INSTANCE_DESCRIPTOR (
  id                  binary(16) primary key,
  key                 varchar(64),
  name                varchar(128),
  description         varchar(256),
  provider_id         binary(16),
  metadata_id         binary(16),

  cost_profile_id     binary(16),
  memory_profile_id   binary(16),
  network_profile_id  binary(16),
  compute_profile_id  binary(16),


  foreign key (provider_id)           references CLOUD_PROVIDER(id),

  foreign key (metadata_id)           references INSTANCE_DESCRIPTOR_METADATA(id),

  foreign key(cost_profile_id)        references COST_PROFILE(id),

  foreign key (memory_profile_id)     references MEMORY_PROFILE(id),

  foreign key (network_profile_id)    references NETWORK_PROFILE(id),

  foreign key (compute_profile_id)    references COMPUTE_PROFILE(id)
);

create table OPERATING_SYSTEM (
  id          binary(16) primary key,

);

create table  NODE_CONFIGURATION (
  id                  binary(16) primary key,
  key                 varchar(64),
  name                varchar(128),
  description         varchar(256),
  provider_id         binary(16),
  metadata_id         binary(16),

  cost_profile_id     binary(16),
  memory_profile_id   binary(16),
  network_profile_id  binary(16),
  compute_profile_id  binary(16),
  software_profile_id binary(16),
  operating_system_id binary(16),


  foreign key (provider_id)           references CLOUD_PROVIDER(id),

  foreign key (metadata_id)           references INSTANCE_DESCRIPTOR_METADATA(id),

  foreign key(cost_profile_id)        references COST_PROFILE(id),

  foreign key (memory_profile_id)     references MEMORY_PROFILE(id),

  foreign key (network_profile_id)    references NETWORK_PROFILE(id),

  foreign key (compute_profile_id)    references COMPUTE_PROFILE(id),

  foreign key (software_profile_id)   references SOFTWARE_PROFILE(id),

  foreign key (operating_system_id)   references SOFTWARE_PROFILE(id)

);


