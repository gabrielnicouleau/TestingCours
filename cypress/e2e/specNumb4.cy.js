describe('fonction de contact API POKEMON fechData', () => {
  beforeEach(() => {
    cy.visit('https://testing.adrardev.fr/addUser')
  });
  const tabUser = [
    {"nom": "Test1", "prenom":"Test1", "mail":"test124@test.fr", "password":"1234"},
    {"nom": "Test2", "prenom":"Test2", "mail":"test125@test.fr", "password":"1234"},
    {"nom": "Test3", "prenom":"Test3", "mail":"test126@test.fr", "password":"1234"},
    {"nom": "Test4", "prenom":"Test4", "mail":"test127@test.fr", "password":"1234"},
    {"nom": "Test5", "prenom":"Test5", "mail":"test128@test.fr", "password":"1234"},
  ]
  //Ajout utilisateur API
  it('addUser API', ()=>{
    //url de l'API
    const url = "https://testing.adrardev.fr/api/addTest"
    //nom du test
    const name = "addUserAPI"
    //date du test
    let date = new Date()
    //formatage de la date du test au format 0000-00-00 (année, numéro du mois, numéro du jour)
    date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
    let valid = true;
    //boucle pour itérer 5 utilisateurs
    for(let i=0; i<tabUser.length; i++){
      //récupération et saisie dans les inputs
      cy.get(':input[name="nom"]').type(tabUser[i].nom)
      cy.get(':input[name="prenom"]').type(tabUser[i].prenom)
      cy.get(':input[name="mail"]').type(tabUser[i].mail)
      cy.get(':input[name="mdp"]').type(tabUser[i].password)
      //clic sur le bouton submit
      cy.get(':input[name="submit"]').click()
      cy.get('#msgzone').invoke("text").then(text=>{
        //test du message enregistrement ok
        if(text=="Le compte a été ajouté en BDD"){
          valid = true;
        }
        //test du message autre erreur
        else{
          valid = false;
        }
        const json = JSON.stringify({name:name, valid:valid, date:date})
        //Requête API 
        cy.request({
          method: 'POST',
          url: url, 
          body: json,
        })
      })
    }
  })
})
  