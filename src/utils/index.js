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
