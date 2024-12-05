CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(60) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS technologies(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS projects(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  imagepath VARCHAR NOT NULL,
  title VARCHAR NOT NULL,
  repositorylink VARCHAR NOT NULL,
  description VARCHAR
);

CREATE TABLE IF NOT EXISTS project_technologies(
  project_id UUID NOT NULL,
  technology_id UUID NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (technology_id) REFERENCES technologies(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS personal_information(
  email VARCHAR NOT NULL DEFAULT 'geovanestuski2@gmail.com',
  phone VARCHAR NOT NULL DEFAULT '42988698179',
  linkedin VARCHAR NOT NULL default 'https://www.linkedin.com/in/geovanestuski',
  github VARCHAR NOT NULL default 'https://github.com/GeovaneStuski',
  about_text VARCHAR
);
