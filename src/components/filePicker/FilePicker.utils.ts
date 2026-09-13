import { FilePickerRemoveContext } from './FilePicker.types.ts';

export async function deleteFileRequest(context: FilePickerRemoveContext) {
  const response = await fetch(context.url, {
    method: 'DELETE',
    body: JSON.stringify({
      [context.name]:
        context.pickerItem.filename || context.pickerItem?.file?.name,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to delete file: ${response.status} ${response.statusText}`
    );
  }
}
