import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
// import * as Permissions from 'expo-permissions';
// import * as MediaLibrary from 'expo-media-library';
// import * as Sharing from 'expo-sharing';

const loadExcelFile = async (): Promise<string | undefined> => {
    // Downloading the file
    try {  
      let data = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false,
        type: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
      });
      if (data.canceled) return;
        const filePath = data.assets[0].uri;
        const fileContent = await FileSystem.readAsStringAsync(filePath, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const binaryString = Buffer.from(fileContent, 'base64').toString('binary');
      return binaryString; 
      } catch (error) {
        console.error(error)
      }
};

export const instructions = {
  loadExcelFile,
};