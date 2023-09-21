export async function timeout(time = 0) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
