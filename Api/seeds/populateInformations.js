const db = require('../src/app/database');

async function populateInformations() {
  try {
    const informations = await db.query('SELECT * FROM personal_information');

    if(informations.length > 0) {
      console.log('Informations already seeded!');
      return;
    }

    await db.query(`
      INSERT INTO personal_information(email, phone, linkedin, github, about_text) 
      VALUES($1, $2, $3, $4, $5)
    `, ['geovanestuski2@gmail.com', '42988698179', 'https://www.linkedin.com/in/geovanestuski', 'https://github.com/GeovaneStuski', 'sobre mim texto']);

    console.log('Informations updated!');
  } catch {
    console.error('Error to populate informations');
  } finally {
    if(db.end) {
      db.end();
    }
    process.exit(0);
  }
}

populateInformations();