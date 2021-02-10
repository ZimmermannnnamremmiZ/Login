import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import {
    validate
} from './helpers/validate';
import {
    showInputError,
    removeInputError
} from './views/form'
import {
    login
} from './services/auth.service';
import {
    notify
} from './views/notifications';
import {
    getNews
} from './services/news.services'

const {
    form,
    inputEmail,
    inputPassword
} = UI;
const inputs = [inputEmail, inputPassword];

// Events
form.addEventListener('submit', e => {
    e.preventDefault();
    onSubmit();
});
inputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)))

// Handlers
async function onSubmit() {
    const isValidForm = inputs.every((el) => {
        const isValidInput = validate(el);
        if (!isValidInput) {
            showInputError(el);
        }
        return isValidInput;
    });

    if (!isValidForm) return;

    try {
        await login(inputEmail.value, inputPassword.value);
        await getNews();
        form.reset();
        // show success notify
        notify({
            msg: 'Login success',
            className: 'alert-success'
        })
    } catch (err) {
        // show error notify
        notify({
            msg: 'Login faild',
            className: 'alert-danger'
        })
    }
}

// Registration
const btn_reg = document.getElementById('reg')
const reg_table = `
<h4 class="card-title" style="margin-top: 30px">Registration</h4>
<form name="loginForm">
<div class="form-group">
  <label for="email">Email address</label>
  <input
    type="email"
    class="form-control"
    id="email"
    aria-describedby="emailHelp"
    placeholder="Enter email"
    data-required="email"
    data-invalid-message="Please provide valid email example@example.com"
  />
</div>
<div class="form-group">
  <label for="password">Password</label>
  <input
    type="password"
    class="form-control"
    id="password"
    placeholder="Password"
    data-required="password"
  />
</div>
<div class="form-group">
  <label for="nickname">Nickname</label>
  <input
    type="text"
    class="form-control"
    id="nickname"
    placeholder="Nickname"
    data-required="nickname"
  />
</div>
<div class="form-group">
  <label for="first_name">First name</label>
  <input
    type="text"
    class="form-control"
    id="first_name"
    placeholder="First name"
    data-required="first_name"
  />
</div>
<div class="form-group">
  <label for="last_name">Last name</label>
  <input
    type="text"
    class="form-control"
    id="last_name"
    placeholder="Last name"
    data-required="last_name"
  />
</div>
<div class="form-group">
  <label for="phone">Phone</label>
  <input
    type="number"
    class="form-control"
    id="phone"
    placeholder="Phone"
    data-required="phone"
  />
</div>
<div class="form-group" style="margin-top: 35px">
  <label for="gender_orientation" style="width: 34%">Gender orientation</label>
  <select class="form-select" style="width: 65%">
  <option value="1">Male</option>
  <option value="2">Female</option>
  </select>
</div>
<div class="form-group">
  <label for="city">City</label>
  <input
    type="number"
    class="form-control"
    id="city"
    placeholder="City"
    data-required="city"
  />
</div>
<div class="form-group">
  <label for="country">Country</label>
  <input
    type="number"
    class="form-control"
    id="country"
    placeholder="Country"
    data-required="country"
  />
</div>
<div class="form-group" style="margin-top: 35px">
  <label for="country" style="width: 34%">Birthday</label>
  <input type="date" id="date"
  value="YYYY-MM-DD" style="width: 65%">
</div>
<button type="button" class="btn btn-primary">Register</button>
`
btn_reg.addEventListener('click', () => {
    form.insertAdjacentHTML('beforeend', reg_table);
}, { once: true })