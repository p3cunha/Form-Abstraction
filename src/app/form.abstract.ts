import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export abstract class CardFormAbstract {
  public form: FormGroup;
  constructor(protected formBuilder: FormBuilder) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group(
      {
        inputCardNumber: ['', [Validators.required]],
        inputCardName: [
          null,
          [
            Validators.required,
            Validators.pattern('^[a-zA-Z ]*$'),
            Validators.maxLength(16),
          ],
        ],
        inputCardExpirationDate: [
          '',
          [Validators.required, Validators.minLength(3)],
        ],
        inputCardCvc: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(4),
          ],
        ],
      },
      { validators: null }
    );
  }

  public controlHasErrors(formControlName: string) {
    return (
      !this.form.get(formControlName).valid &&
      (this.form.get(formControlName).dirty ||
        this.form.get(formControlName).touched)
    );
  }
}
