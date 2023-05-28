const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.validRegister();
    if (this.errors.length > 0) return;

    await this.userExists();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await LoginModel.create(this.body);
  }

  async login() {
    this.validLogin();
    if(this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push('E-mail or password is invalid.');
      return;
    }

    if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('E-mail or password is invalid.');
      this.user = null;
      return;
    }

  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push('User already exists.');
  }

  validRegister() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) {
      this.errors.push('Invalid E-mail.');
    }

    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push('Password must have between 3 to 50.');
    }
  }
  validLogin() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) {
      this.errors.push('E-mail or Password is invalid.');
      return;
    }

    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push('E-mail or Password is invalid.');
      return;
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') this.body[key] = '';
    }

    this.body = { email: this.body.email, password: this.body.password };
  }
}

module.exports = Login;
