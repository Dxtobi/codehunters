import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

export async function elementToPNG(element: HTMLElement): Promise<void> {
    try {
        const height = element.scrollHeight;
        const width = element.scrollWidth;
        const canvas = await html2canvas(element, {
        height, width
      });
      const blob = await new Promise<Blob | null>((resolve, reject) => {
        canvas.toBlob(blob => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create image blob.'));
          }
        }, 'image/png');
      });
      if (blob) {
        saveAs(blob, 'image.png');
      } else {
        throw new Error('Failed to download image: Blob is null.');
      }
    } catch (error) {
      console.error('Failed to download image:', error);
      throw error;
    }
}
  


export function removeObjectById(array: any[], id: string) {
  const index = array.findIndex((obj) => obj.id === id); // Find the index of the object with the matching ID
  if (index > -1) { // If an object with the matching ID was found
    array.splice(index, 1); // Remove the object from the array
  }
  return array; // Return the new array
}