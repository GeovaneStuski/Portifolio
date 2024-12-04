CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(60) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL
);

CREATE TABLE technologies(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(60) NOT NULL
);

CREATE TABLE projects(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  imagepath VARCHAR NOT NULL,
  title VARCHAR NOT NULL,
  repositorylink VARCHAR NOT NULL,
  description VARCHAR
);

CREATE TABLE project_technologies(
  project_id UUID NOT NULL,
  technology_id UUID NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (technology_id) REFERENCES technologies(id) ON DELETE CASCADE
);

CREATE TABLE personal_information(
  email VARCHAR NOT NULL DEFAULT 'geovanestuski2@gmail.com',
  phone VARCHAR NOT NULL DEFAULT '42988698179',
  linkedin VARCHAR NOT NULL default 'https://www.linkedin.com/in/geovanestuski',
  github VARCHAR NOT NULL default 'https://github.com/GeovaneStuski',
  about_text VARCHAR
);

INSERT INTO personal_information(email,phone,linkedin,github) 
VALUES('geovanestuski2@gmail.com', '42988698179', 'https://www.linkedin.com/in/geovanestuski', 'https://github.com/GeovaneStuski');

INSERT INTO users(username, password)
VALUES('macquin', '1234');