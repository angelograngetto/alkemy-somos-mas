import Swal from 'sweetalert2';

/*
  This function show an alert (info, error, success and confirmation).
  Receives three parameters: type, title and text and returns a promise (if accepted the alert
    returns true else, return false).

  Types supported:
    - success
    - error
    - confirm (or question)
    - info
*/

const Alert = (type = 'success', title = '', text = '') => {
  if (type === 'confirm') type = 'question'; // replace 'confirm' to 'question' for the sweetalert2 icon
  return Swal.fire({
    icon: type,
    title,
    text,
    showConfirmButton: type !== 'success',
    showCancelButton: type === 'question',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    timer: type === 'success' && 2000,
    allowOutsideClick: false,
  }).then((result) => {
    if (type === 'success') return result.isDismissed;
    return result.isConfirmed;
  });
};

export default Alert;
