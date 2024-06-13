import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidator } from '../validators/aap-validation.validator';
import { FormDataService } from '../services/form-data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor(private router: Router , private formDataArray: FormDataService) {}
  reactiveForm: FormGroup;
  formdata: any = {};

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$'),
        Validators.minLength(2),
        CustomValidator.noSpaceAllowed,
      ]),
      lastname: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$'),
        Validators.minLength(2),
        CustomValidator.noSpaceAllowed,
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNo: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      linkedin: new FormControl(
        null,
        Validators.pattern(
          '^(https?://)?([a-z0-9-]+\\.)?linkedin\\.com/(in|company)/[a-zA-Z0-9_-]+$'
        )
      ),
      username: new FormControl(null, [Validators.required]),
      dob: new FormControl(null, [
        Validators.required,
        CustomValidator.minimumAgeValidation,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        CustomValidator.invalidPassword,
      ]),
      income: new FormControl(null, [Validators.required]),
      color: new FormControl('#ffffff', [Validators.required]),
      gender: new FormControl('male', [Validators.required]),
      address: new FormGroup({
        street: new FormControl(null, [Validators.required]),
        city: new FormControl(null),
        region: new FormControl(null),
        country: new FormControl('India', Validators.required),
        postalcode: new FormControl(null, [
          Validators.required,
          Validators.maxLength(5),
          Validators.pattern('^[0-9]{5}$'),
        ]),
      }),
      skills: new FormArray([new FormControl(null, Validators.required)]),
      isAccept: new FormControl(false, Validators.requiredTrue),
    });
  }
  addSkills() {
    (this.reactiveForm.get('skills') as FormArray).push(
      new FormControl(null, Validators.required)
    );
  }
  deleteSkills(i: number) {
    const controls = this.reactiveForm.get('skills') as FormArray;
    controls.removeAt(i);
  }
  generateUsername() {
    let username = '';
    const fName: string = this.reactiveForm.get('firstname').value;
    const lName: string = this.reactiveForm.get('lastname').value;
    const dob: string = this.reactiveForm.get('dob').value;

    if (fName.length >= 3) {
      username += fName.slice(0, 3);
    } else {
      username += fName;
    }

    if (lName.length >= 3) {
      username += lName.slice(0, 3);
    } else {
      username += lName;
    }

    let datetime = new Date(dob);
    username += datetime.getFullYear();

    username = username.toLowerCase();
    this.reactiveForm.patchValue({
      username: username,
    });
  }

  onFormSubmitted() {
    if (this.reactiveForm.valid) {
      this.formdata = this.reactiveForm.value;
      this.formDataArray.addData(this.reactiveForm.value)
      console.log(this.formDataArray)
      this.router.navigate(['/data']);
      this.reactiveForm.reset({
        firstname: null,
        lastname: null,
        email: null,
        phoneNo: null,
        linkedin: null,
        username: null,
        dob: null,
        password: null,
        income: null,
        color: '#ffffff',
        gender: 'male',
        address: {
          street: null,
          city: null,
          region: null,
          country: 'India',
          postalcode: null,
        },
        skills: [null],
        isAccept: null,
      });
    } else {
      console.log('invalid');
    }
  }
}

