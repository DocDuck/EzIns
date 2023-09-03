import { INSTRUCTION_FOLDER } from "shared/config";
import * as FileSystem from 'expo-file-system';
// import * as Permissions from 'expo-permissions';
// import * as MediaLibrary from 'expo-media-library';
// import * as Sharing from 'expo-sharing';
import { Logs } from 'expo'

Logs.enableExpoCliLogging()

const BASE_URL = "./assets/files";
const TEMPLATE = "template.xlsx";

export type Instruction = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

const getTable = async (): Promise<FileSystem.FileSystemDownloadResult | undefined> => {
	console.log('FileSystem.documentDirectory', FileSystem.documentDirectory);
        // Downloading the file
		let res: FileSystem.FileSystemDownloadResult;		
    let fileLocation = FileSystem.documentDirectory + BASE_URL + TEMPLATE;
    try {
			res = await FileSystem.downloadAsync(BASE_URL, fileLocation)
			console.log('res', res);
        // Saving the file in a folder name `MyImages`
        // const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        // if (status === "granted") {
        //     const asset = await MediaLibrary.createAssetAsync(BASE_URL)
        //     await MediaLibrary.createAlbumAsync("MyImages", asset, false)
        // }

        // // Sharing the downloded file
        // Sharing.shareAsync(fileLocation);
				return res;
    }
		catch ( error) {
        console.error(error);
    }
};

export const instructions = {
  getTable,
};