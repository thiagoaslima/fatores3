import Toast from '../toaster/Toast';
import { Session } from '../session/Session';
import { UserRepository } from '../models/UserModel';
export class LoginCtrl {
    constructor($state, Toast, Session, UserRepository) {
        this.$state = $state;
        this.Toast = Toast;
        this.Session = Session;
        this.UserRepository = UserRepository;
    }
    _log(user) {
        this.Session.start(user);
        this.$state.go('configuracao');
    }
    login(evt, UserName, Password) {
        const log = this._log.bind(this);
        const offline = () => {
            let check = this.UserRepository.checkCredentials(UserName, Password);
            if (check) {
                return log(check);
            }
            else {
                this.reset();
                this.Toast.show('Não foi possível realizar seu login. Por favor, confira nome de usuário e senha e tente novamente.');
            }
        };
        this.UserRepository.checkOnline(UserName, Password)
            .then(log)
            .catch(offline);
    }
    reset() {
        this.UserName = '';
        this.Password = '';
    }
}
LoginCtrl.IID = 'LoginController';
LoginCtrl.$inject = ['$state', Toast.IID, Session.IID, UserRepository.IID];
