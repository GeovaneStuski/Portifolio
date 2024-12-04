export function formatList(list) {
  if(list.length == 0) return '';
  if(list.length == 1) return list[0];

  return `${list?.slice(0, -1).join(' - ')} - ${list[list.length - 1]}`;
}