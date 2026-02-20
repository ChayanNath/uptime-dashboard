import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ReportStore } from '../../../../core/report.store';

@Component({
  standalone: true,
  selector: 'app-add-report-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-report-modal.html',
})
export class AddReportModal {
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private store = inject(ReportStore);

  form = this.fb.nonNullable.group({
    title: ['', Validators.required, noWhitespaceValidator],
    subtitle: ['', Validators.required, noWhitespaceValidator],
  });

  submit() {
    if (this.form.invalid) return;

    this.store.add({
      id: crypto.randomUUID(),
      metrics: this.store.generateMetrics(),
      ...this.form.getRawValue(),
    });

    this.close.emit();
  }
}

export function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
  return control.value?.trim().length ? null : { whitespace: true };
}
