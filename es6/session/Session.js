import { toISOString } from '../utils/dates';
import { assign } from "../utils/objects";
import { Repository } from '../models/Repositories';
import Storage from "../storage/Storage";
export class SessionRepository {
    constructor() {
        this.atividades = new Repository();
        this.atividadesTarefa = new Repository();
        this.cenarios = new Repository();
        this.cenariosValor = new Repository();
        this.empresas = new Repository('RazaoSocial');
        this.funcoes = new Repository();
        this.obras = new Repository();
        this.tarefas = new Repository();
    }
}
export class Session {
    constructor(Storage) {
        this.Storage = Storage;
        this.type = 'sessions';
        this.user = null;
        this.repositorios = new SessionRepository;
        this.configuracao = assign(Object.create(null), {
            empresa: 0,
            obra: 0,
            contratada: 0,
            tarefa: 0,
            equipe: []
        });
        this.states = {
            started: false,
            time: ''
        };
        this.init();
    }
    init() {
        this.lastSessions = this.Storage.read(this.type) || [];
    }
    start(user) {
        this.user = user;
        // states
        this.states.started = true;
        this.states.time = toISOString(new Date());
    }
    end() {
        this.user = null;
        // states
        this.states.started = false;
        this.states.time = '';
        // update localStorage sessions register
        const session = Session.simplify(this);
        this.lastSessions.push(session);
        this.Storage.write(this.type, this.lastSessions);
    }
    isSet() {
        return this.states.started;
    }
    getToken() {
        return this.user.Token;
    }
    static simplify(session) {
        let simpleSession = Object.create(null);
        simpleSession.configuracao = session.configuracao;
        return simpleSession;
    }
}
Session.IID = 'Session';
Session.$inject = [Storage.IID];
