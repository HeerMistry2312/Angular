import { FormControl } from '@angular/forms';

export class CustomValidator {
  static noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true };
    }
    return null;
  }

  static minimumAgeValidation(control: FormControl) {
    if (control.value != null) {
      const currentDate = new Date();
      const dob = new Date(control.value);
      const ageDifference = currentDate.getFullYear() - dob.getFullYear();
      if (ageDifference < 18) {
        return { minimumAgeValidation: true };
      }
    }
    return null;
  }


  static invalidPassword(control: FormControl) {
    const password = control.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return { invalidPassword: true };
    }

    return null;
  }
}
