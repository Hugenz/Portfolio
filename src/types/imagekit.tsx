export type IkFile = {
    fileId: string;
    name: string;
    url: string;
    folder: string;
    filePath: string;
    type?: string; // file ou folder, si besoin
};

export type Project = {
    category: string;
    project: string;
    cover: IkFile;
};
