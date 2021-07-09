import {FormGroup} from '@angular/forms';

export function MinLengthNotEmptyFields(minLengthNotEmptyFields: number) {
  return (formGroup: FormGroup) => {
    let count = 0;
    console.log("==>>", count )
    for (let key in formGroup.value) {
      if (formGroup.value[key]) {
        if (formGroup.controls[key].errors) {
          // return
        } else {
          count++;
        }
      } else {
        if (formGroup.controls[key].errors) {
          // return
        }else{
          formGroup.controls[key].setErrors({MinLengthNotEmptyFields: true})
        }
      }
    }

    if (count > minLengthNotEmptyFields) {
      for (let key in formGroup.controls) {
        formGroup.controls[key].setErrors(null)
      }
    }
  }
}


