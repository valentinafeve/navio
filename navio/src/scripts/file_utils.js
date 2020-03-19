import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
const { Filesystem } = Plugins;

export const fileUtils = {
    methods: {
        fileWrite(text){
          return Filesystem.writeFile({
            path: 'goals.json',
            data: text,
            directory: FilesystemDirectory.Data,
            encoding: FilesystemEncoding.UTF8
          })
        },
        fileRead() {
          return Filesystem.readFile({
            path: 'goals.json',
            directory: FilesystemDirectory.Data,
            encoding: FilesystemEncoding.UTF8
          })
        },

    }
}
