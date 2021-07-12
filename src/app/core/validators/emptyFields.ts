import { FormGroup } from '@angular/forms';

export function MinLengthNotEmptyFields(minLengthNotEmptyFields: number) {
  return (formGroup: FormGroup) => {
    let arr = [];
    // console.log("22222222", formGroup.valid)
    for (let key in formGroup.value) {
      if (formGroup.value[key]) {
        arr.push(formGroup.value[key])
        if (arr.length > (minLengthNotEmptyFields - 1)) {

          if (!formGroup.controls[key].errors) {
            for (let field in formGroup.value) {

              formGroup.controls[field].setErrors(null)
              console.log("null", formGroup.valid)
              // console.log("null",  formGroup.controls[field].errors)
              return
            }
          }
        }
      } else {
        if (formGroup.controls[key].errors) {
          // return         
          console.log("errrr", formGroup.valid)
          // console.log("else iff err", formGroup.controls[key].errors)
        } else {
          formGroup.controls[key].setErrors({ MinLengthNotEmptyFields: true })
        }
      }
    }
  }
}


