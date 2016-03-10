import { UserEntity } from '../models/UserModel';
import { Repository } from '../models/Repositories';
import Storage from "../storage/Storage";
export declare class SessionRepository {
    atividades: Repository<fatores.models.IAtividade>;
    atividadesTarefa: Repository<fatores.models.IAtividadeTarefa>;
    cenarios: Repository<fatores.models.ICenario>;
    cenariosValor: Repository<fatores.models.ICenarioValor>;
    empresas: Repository<fatores.models.IEmpresa>;
    funcoes: Repository<fatores.models.IFuncao>;
    obras: Repository<fatores.models.IObra>;
    tarefas: Repository<fatores.models.ITarefa>;
}
export interface ISessionConfiguracao {
    empresa: number;
    obra: number;
    contratada: number;
    tarefa: number;
    equipe: any[];
}
export interface ISession {
    user: UserEntity;
    repositorios: SessionRepository;
    configuracao: ISessionConfiguracao;
    states: {
        started: boolean;
        time: string;
    };
    lastSessions: Session[];
    init: () => void;
    start: (user: UserEntity) => void;
    end: () => void;
    isSet: () => boolean;
    getToken: () => string;
}
export declare class Session implements ISession {
    private Storage;
    static IID: string;
    static $inject: string[];
    type: string;
    user: UserEntity;
    repositorios: SessionRepository;
    configuracao: ISessionConfiguracao;
    states: {
        started: boolean;
        time: string;
    };
    lastSessions: Session[];
    constructor(Storage: Storage);
    init(): void;
    start(user: UserEntity): void;
    end(): void;
    isSet(): boolean;
    getToken(): string;
    static simplify(session: any): any;
}
