export function calculateAge(dateNaissance) {
  const now = new Date();
  const birthDate = new Date(dateNaissance);

  let age = now.getFullYear() - birthDate.getFullYear();
  const moisActuel = now.getMonth();
  const moisNaissance = birthDate.getMonth();

  if (
    moisActuel < moisNaissance ||
    (moisActuel === moisNaissance && now.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

export function dateConvertor(dateString) {
  const [day, month, year] = dateString.split("/");
  const jsDate = new Date(year, month - 1, day);
  return jsDate;
}
