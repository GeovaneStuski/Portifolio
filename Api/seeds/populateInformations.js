const db = require('../src/app/database');

async function populateInformations() {
  await db(`
    INSERT INTO personal_informations(email, phone, linkedin, github, about_text) 
    VALUES(geovanestuski2@gmail.com, 42988698179, https://www.linkedin.com/in/geovanestuski, https://github.com/GeovaneStuski, sobre mim texto)
  `);
}

populateInformations();