export class FormUtils {

  /** Obtiene mensaje estándar para el error del campo */
  static getFieldError(form: any, field: string): string {
    const control = form.get(field);
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;

    if (errors['required']) return 'Este campo es obligatorio';
    if (errors['email']) return 'Ingrese un correo válido';
    if (errors['minlength']) {
      return `Debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
    }
    if (errors['maxlength']) {
      return `No debe superar ${errors['maxlength'].requiredLength} caracteres`;
    }
    if (errors['pattern']) return 'El formato ingresado no es válido';

    return 'Campo inválido';
  }
}
