import { getClockTime, toISOString } from '../utils/dates';
import { assign } from "../utils/objects";

import { UserEntity } from '../models/UserModel';
import { Repository, TreeRepository } from '../models/Repositories';
import Storage from "../storage/Storage";


export class SessionRepository {
    atividades = new Repository<fatores.models.IAtividade>();
    atividadesTarefa = new Repository<fatores.models.IAtividadeTarefa>();
    cenarios = new Repository<fatores.models.ICenario>();
    cenariosValor = new Repository<fatores.models.ICenarioValor>();
    empresas = new Repository<fatores.models.IEmpresa>('RazaoSocial');
    funcoes = new Repository<fatores.models.IFuncao>();
    obras = new Repository<fatores.models.IObra>();
    tarefas = new Repository<fatores.models.ITarefa>();
}

export interface ISessionConfiguracao {
    empresa: number;
    obra: number;
    contratada: number;
    tarefa: number;
    equipe: any[];
}

export interface ISession {
    user: UserEntity,
    repositorios: SessionRepository;
    configuracao: ISessionConfiguracao;
    states: {
        started: boolean;
        time: string;
    }
    lastSessions: Session[];

    init: () => void;

    start: (user: UserEntity) => void;
    end: () => void;

    isSet: () => boolean;
    getToken: () => string
}



export class Session implements ISession {
    static IID = 'Session';
    static $inject = [Storage.IID];
    
    type = 'sessions'
    user: UserEntity = null;
    repositorios = new SessionRepository;
    configuracao: ISessionConfiguracao = assign(Object.create(null), {
        empresa: 0,
        obra: 0,
        contratada: 0,
        tarefa: 0,
        equipe: []
    });
    states = {
        started: false,
        time: ''
    }
    lastSessions: Session[];

    constructor(private Storage: Storage) {
        this.init();
    }

    init() {
        this.lastSessions = this.Storage.read(this.type) || [];
    }

    start(user: UserEntity): void {
        this.user = user;
        
        // states
        this.states.started = true;
        this.states.time = toISOString(new Date());
    }

    end(): void {
        this.user = null;
        
        // states
        this.states.started = false;
        this.states.time = '';
        
        // update localStorage sessions register
        const session = Session.simplify(this);
        this.lastSessions.push(session);
        
        this.Storage.write(this.type, this.lastSessions);
    }
    
    isSet(): boolean {
        return this.states.started;
    }
    
    getToken(): string {
        return this.user.Token;
    }
    
    static simplify(session) {
        let simpleSession = Object.create(null);
        simpleSession.configuracao = session.configuracao;
        
        return simpleSession; 
    }
}