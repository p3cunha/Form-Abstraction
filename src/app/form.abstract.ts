import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export abstract class CardFormAbstract {
  openNewCard = false;
  isStoreCards = false;
  public form: FormGroup;
  protected isflipped: boolean;
  protected ccsingle: string;
  protected color: string;
  protected name: string;
  protected orderErrorPayment$: Observable<string>;
  protected paymentsLoadingState$: Observable<boolean>;

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
