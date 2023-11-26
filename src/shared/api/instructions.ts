import * as FileSystem from 'expo-file-system';
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

const getTable = async (): Promise<FileSystem.FileSystemDownloadResult | undefined> => {
        // Downloading the file
		let res: FileSystem.FileSystemDownloadResult;
    try {
      const file = FileSystem.downloadAsync(require('assets/files/template.xlsx'), FileSystem.documentDirectory + TEMPLATE);
			console.log('res', file);
        // Saving the file in a folder name `MyImages`
        // const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        // if (status === "granted") {
        //     const asset = await MediaLibrary.createAssetAsync(BASE_URL)
        //     await MediaLibrary.createAlbumAsync("MyImages", asset, false)
        // }

        // // Sharing the downloded file
        // Sharing.shareAsync(fileLocation);
				return file;
    }
		catch ( error) {
        console.error(error);
    }
};

export const instructions = {
  getTable,
};