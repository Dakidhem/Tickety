export default function formatDateForInput(dateString) {
  // Convertir la chaîne de caractères en objet Date
  const dateObject = new Date(dateString);

  // Extraire les composants de la date
  const year = dateObject.getFullYear();
  let month = dateObject.getMonth() + 1; // Les mois vont de 0 à 11
  let day = dateObject.getDate();

  // Ajouter un zéro devant le mois et le jour si nécessaire
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  // Retourner la date au format YYYY-MM-DD
  return `${year}-${month}-${day}`;
}
