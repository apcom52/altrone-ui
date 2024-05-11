import { FilePickerRemoveContext } from './FilePicker.types.ts';

export async function deleteFileRequest(context: FilePickerRemoveContext) {
  await fetch(context.url, {
    method: 'DELETE',
    body: JSON.stringify({
      [context.name]:
        context.pickerItem.filename || context.pickerItem?.file?.name,
    }),
  });
}
