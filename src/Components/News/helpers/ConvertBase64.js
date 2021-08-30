//FUNCTION CONVERT BASE 64 - ALLOWS TO POST IMAGES IN API

export const convertBase64 = (file) => {
  if (file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = function () {
        resolve(fileReader.result);
      };

      fileReader.onerror = function () {
        reject(Error('Algo salió mal, vuelve a intentarlo'));
      };
    });
  }
};
