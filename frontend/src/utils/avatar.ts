
export function generateAvatar(name: string) {
  if (!name) return { initials: "?", bgColor: "#ccc" };

  const names = name.split(" ");
  const initials =
    names[0].charAt(0).toUpperCase() +
    (names.length > 1 ? names[1].charAt(0).toUpperCase() : "");

  const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  const bgColor = `hsl(${hue}, 70%, 50%)`;

  return { initials, bgColor };
}
