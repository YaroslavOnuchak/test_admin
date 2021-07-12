import {FormGroup} from '@angular/forms';

export function MinLengthNotEmptyFields(minLengthNotEmptyFields: number) {
  return (formGroup: FormGroup) => {
    let arr = [];
    let key: string;
    for (key in formGroup.value) {
      if (!formGroup.controls[key].errors) {

        formGroup.controls[key].setErrors({minLengthNotEmptyFields: true})
      }
      if (formGroup.value[key]) {
        arr.push(formGroup.value[key])
      }
    }
    if (arr.length > (minLengthNotEmptyFields - 1)) {
      let field: string;
      for (field in formGroup.value) {
        if (formGroup.controls[field].errors?.minLengthNotEmptyFields) {
          formGroup.controls[field].setErrors(null);
        }
      }
    }

  }
}


