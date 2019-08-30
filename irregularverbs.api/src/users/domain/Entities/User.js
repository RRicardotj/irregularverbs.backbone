class User {
  constructor({ email, name, lastname, password, id } = {}) {
    this.email = email;
    this.name = name;
    this.lastname = lastname;
    this.password = password;
    this.id = id;
  }

  setId(id) {
    this.id = id;
  }

  removePassword() {
    delete this.password;
  }
}

module.exports = User;
