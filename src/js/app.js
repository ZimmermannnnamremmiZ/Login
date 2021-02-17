import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import UI from './config/ui.config';
import {validate} from './helpers/validate';
import {showInputError, removeInputError} from './views/form'
import {login} from './services/auth.service';
import {notify} from './views/notifications';
import {getNews} from './services/news.services'
import {postReg} from './services/auth.service'
import {getCountries} from './services/autocomplete'
import {getCities} from './services/autocomplete'

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
const btn_reg = document.getElementById('reg');
const reg_table = `
<div class="form-card card ml-auto">
<div class="card-body">
<h4 class="card-title" style="margin-top: 30px">Registration</h4>
<form name="reg_form">
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
    data-invalid-message="Please provide valid password .!.."
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
  <label for="gender_orientation" style="width: 39%">Gender orientation</label>
  <select class="form-select" style="width: 60%" id="gender_orientation">
  <option value="1">male</option>
  <option value="2">female</option>
  </select>
</div>
<div class="form-group">
  <label for="country">Country</label>
  <input
    type="text"
    class="form-control"
    id="country"
    placeholder="Country"
    data-required="country"
  />
</div>
<div class="form-group">
  <label for="city">City</label>
  <input
    type="text"
    class="form-control"
    id="city"
    placeholder="City"
    data-required="city"
    disabled
  />
</div>
<div class="form-group" style="margin-top: 35px">
  <label for="country" style="width: 39%">Birthday</label>
  <input type="date" id="date" style="width: 60%">
</div>
<input type="submit" class="btn btn-primary" id="post_reg" value="Register" style="margin-top: 15px">
</form>
</div>
</div>
`

const card = document.getElementById('card');
btn_reg.addEventListener('click', () => {
  card.innerHTML = '';
  card.innerHTML = reg_table;
  const form_registr = document.forms['reg_form']

  // Autocomplete for countries (BEGIN)
  getCountries().then(objCountries => {
    const autocomplete = $(function () {
      let availableTags = Object.values(objCountries);
      $("#country").autocomplete({
        source: availableTags
      });
    });
    return autocomplete
  })
  // Autocomplete for countries (END)
  
  
  
  // Autocomplete for cities (BEGIN)
  getCountries().then(objCountries => {
    let countryInput = document.getElementById('country');
    countryInput.addEventListener('change', () => {
      let keyByCountry = Object.keys(objCountries).find(key => objCountries[key] === document.getElementById('country').value);
      return (getCities(keyByCountry).then(cities => {
        const autocomplete = $(function () {
          let availableTags = cities;
          $("#city").autocomplete({
            source: availableTags
          });
        });
        return autocomplete
      }));
    })
  })
// Autocomplete for cities (END)


  form_registr.addEventListener('submit', (e) => {
    e.preventDefault();
    let date = document.getElementById('date').value.split('-');
    const reg_res = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      nickname: document.getElementById('nickname').value,
      first_name: document.getElementById('first_name').value,
      last_name: document.getElementById('last_name').value,
      phone: document.getElementById('phone').value,
      gender_orientation: document.getElementById('gender_orientation').options[document.getElementById('gender_orientation').selectedIndex].text,
      city: document.getElementById('city').value,
      country: document.getElementById('country').value,
      date_of_birth_day: date[2],
      date_of_birth_month: date[1],
      date_of_birth_year: date[0],
    };
    postReg(reg_res)

    console.log(postReg(reg_res))
  });
}, {
  once: true
});