import axiosClient from "./axiosClient";

const MediaApi = {
    getMedia(folder,loadType,searchKey) {
        const url = '/api/medias/'+folder;
        return axiosClient.get(url,{ params: { loadType: loadType ,search: searchKey} });
    },
    folderStore(data) {
        const url = '/api/medias/medias-folder/store';
        return axiosClient.post(url, data);
    },
}

export default MediaApi