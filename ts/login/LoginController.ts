import Toast from '../toaster/Toast';
import { Session } from '../session/Session';
import { UserEntity, UserRepository } from '../models/UserModel';

export class LoginCtrl {
    static IID = 'LoginController';
    static $inject = ['$state', Toast.IID, Session.IID, UserRepository.IID];
    
    protected UserName: string;
    protected Password: string;

    constructor(private $state: ng.ui.IStateService,
        private Toast: Toast,
        private Session: Session,
        private UserRepository: UserRepository) {

    }

    private _log(user: UserEntity): void {
        this.Session.start(user);
        this.$state.go('configuracao');
    }

    public login(evt, UserName, Password):void {
        const log = this._log.bind(this);

        const offline = () => {
            let check = this.UserRepository.checkCredentials(UserName, Password)
            if (check) {
                return log(check)
            } else {
                this.reset();
                this.Toast.show('Não foi possível realizar seu login. Por favor, confira nome de usuário e senha e tente novamente.')
            }
        };
        
        this.UserRepository.checkOnline(UserName, Password)
            .then(log)
            .catch(offline);
    }
    
    reset():void {
        this.UserName = '';
        this.Password = '';
    }
}