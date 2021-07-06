export class saveJawaban{
    constructor(
        public id : number,
        public pertanyaan : string,
        public jawaban : any,
        public jawabanTambahan : string,
        public nominal : number,
        public tanggal : string,
        public filePendukung : string,
    ){}
}