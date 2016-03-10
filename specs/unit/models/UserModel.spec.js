import { URLs } from '../../../es6/core/settings';
import UserModel from '../../../es6/models/UserModel';
import Promise from 'bluebird';

const form = {
	correct: { username: 'user', password: 'senha' },
	offline: { username: 'user', password: 'local' },
	wrong: { username: 'wrong', password: 'wrong' }
};

const Crypto = {
	SHA256: function(str) {
		return str.split('').reverse().join('');
	}
};

const windowMock = {
	Crypto: Crypto
};

const basicUser = {
	Token: "60f7e6d5-dec3-4fb5-8b5d-213307da0ffa",
	UserId: "6cd55c50-978c-423b-aa7b-e4157f2cb9e8",
	UserName: form.correct.username,
	Empresas: [ 1, 2 ],
	Obras: [ 1, 2, 3 ],
	Tarefas: [ 1, 2, 3, 4 ],
	Expiracao: "2015-12-18T14:05:05.6118555Z"
};
basicUser.Password = Crypto.SHA256(form.correct.password);

let i = 0;
let arr = [];

const localUser = {
	Token: "",
	UserId: "1",
	UserName: form.offline.username,
	Empresas: [],
	Obras: [],
	Tarefas: [],
	Expiracao: "2015-01-01T00:00:00.0000000Z"
}
localUser.Password = Crypto.SHA256(form.offline.password);



const users = [basicUser, localUser];

const errorMsg = {"Message":"An error has occurred.","ExceptionMessage":"Login falhou","ExceptionType":"FatoresWebV2.Controllers.LoginException","StackTrace":" at FatoresWebV2.Controllers.TokenController.GetTokens(String username, String password)\r\n at lambda_method(Closure , Object , Object[] )\r\n at System.Web.Http.Controllers.ReflectedHttpActionDescriptor.ActionExecutor.<>c__DisplayClass10.b__9(Object instance, Object[] methodParameters)\r\n at System.Web.Http.Controllers.ReflectedHttpActionDescriptor.ActionExecutor.Execute(Object instance, Object[] arguments)\r\n at System.Web.Http.Controllers.ReflectedHttpActionDescriptor.ExecuteAsync(HttpControllerContext controllerContext, IDictionary`2 arguments, CancellationToken cancellationToken)\r\n--- End of stack trace from previous location where exception was thrown ---\r\n at System.Runtime.CompilerServices.TaskAwaiter.ThrowForNonSuccess(Task task)\r\n at System.Runtime.CompilerServices.TaskAwaiter.HandleNonSuccessAndDebuggerNotification(Task task)\r\n at System.Web.Http.Controllers.ApiControllerActionInvoker.d__0.MoveNext()\r\n--- End of stack trace from previous location where exception was thrown ---\r\n at System.Runtime.CompilerServices.TaskAwaiter.ThrowForNonSuccess(Task task)\r\n at System.Runtime.CompilerServices.TaskAwaiter.HandleNonSuccessAndDebuggerNotification(Task task)\r\n at System.Web.Http.Controllers.ActionFilterResult.d__2.MoveNext()\r\n--- End of stack trace from previous location where exception was thrown ---\r\n at System.Runtime.CompilerServices.TaskAwaiter.ThrowForNonSuccess(Task task)\r\n at System.Runtime.CompilerServices.TaskAwaiter.HandleNonSuccessAndDebuggerNotification(Task task)\r\n at System.Web.Http.Dispatcher.HttpControllerDispatcher.d__1.MoveNext()"};

const ajaxMock = {
	get: function get(url, params) {
		return new Promise( (resolve, reject) => {
			if (url !== URLs.services + URLs.endpoints.token) {
				reject(new Error('Wrong url'));
			}	
			
			if (params.UserName === form.correct.UserName && params.Password === form.correct.Password) {
				let resp = Object.assign({}, basicUser);
				delete(resp.Password);
				resolve({status: 200, data: basicUser});
			} else {
				reject({status: 400, data: errorMsg});
			}
		});
	},
	post: function post() {
		return new Promise( resolve => resolve());
	}
};

const $q = function(user, ...args) {
	return user;
}

describe('UserModel', () => {
	
	let model;

	beforeEach( () => {
		model = new UserModel(windowMock, $q, ajaxMock);
	});
	
	it('start with a null user', () => {
		expect(model.user).toBeNull();
	});
	
	it('should set a new user', () => {
		let expected = JSON.stringify(basicUser);
		let actual = JSON.stringify(model.setUser(basicUser, form.correct.password));
		
		expect(actual).toBe(expected);
	});
	
	it('should receive an user data', (done) => {
		let {username, password} = form.correct;
		
		model = new UserModel(windowMock, $q.bind($q, basicUser), ajaxMock);
		
		model.checkOnline(username, password).then( resp => {
			expect(JSON.stringify(resp)).toBe(JSON.stringify(basicUser));
			done();
		});
	});
	
	it('should log an offline with correct credentials', () => {
		let {username, password} = form.offline;
		
		model = new UserModel(windowMock, $q.bind($q, localUser), ajaxMock);
		let actual = model.checkCredentials(users, username, password);
		
		expect(JSON.stringify(actual)).toBe(JSON.stringify(localUser));
	});
	
});