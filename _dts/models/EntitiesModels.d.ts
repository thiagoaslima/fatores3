export interface IBasicModel {
    Id: number;
    Nome?: string;
    RazaoSocial?: string;
    DataAtualizacao: string;
}
export interface ITreeModel extends IBasicModel {
    children: number[];
    registerChild(...ids: number[]): void;
}
export interface IEmpresaModel extends IBasicModel {
    RazaoSocial: string;
    Tarefas: number[];
    Obras: number[];
}
