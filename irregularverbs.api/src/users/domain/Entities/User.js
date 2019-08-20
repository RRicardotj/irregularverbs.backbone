class User {
  constructor({ email, name, lastname, password, id } = {}) {
    this.email = email;
    this.name = name;
    this.lastname = lastname;
    this.password = password;
    this.id = id;
  }

  setId(id) {
    console.log('seting id');
    this.id = id;
  }

  removePassword() {
    console.log('Deleting password');
    delete this.password;
  }
}

module.exports = User;
