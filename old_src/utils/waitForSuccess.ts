export async function waitForSuccess(callback: () => Promise<unknown>, repeats = 50) {
  if (repeats <= 0) {
    return false;
  }

  const callbackResult = await callback();

  if (!callbackResult) {
    await waitForSuccess(callback, repeats - 1);
    return false;
  } else {
    return true;
  }
}
