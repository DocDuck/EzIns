import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx';
// import * as Permissions from 'expo-permissions';
// import * as MediaLibrary from 'expo-media-library';
// import * as Sharing from 'expo-sharing';

const TEMPLATE = "template.xlsx";

export type Instruction = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

const getTable = async (): Promise<XLSX.WorkBook | undefined> => {
    // Downloading the file
    try {  
      let data = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: false, type: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']});
      if (data.canceled) return;
      const result = data.assets[0]
      let content = result.uri//.split(',')[1];
      let workbook = null;
      if (content){
        workbook = XLSX.read(content, {type: 'base64'});
      } else {
        const uri = FileSystem.documentDirectory+result.name;
        await FileSystem.copyAsync({
          from: result.uri,
          to: uri
        })
        const b64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        workbook = XLSX.read(b64, {type: "base64"});
      }
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      console.log(JSON.stringify(workbook))
      // setItemsInventario({data: json, count: json.length, name: result.name});
       
    } catch (error) {
      console.error(error)
    }
};

export const instructions = {
  getTable,
};