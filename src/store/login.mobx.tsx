import { action, makeObservable, observable, runInAction } from "mobx"
import { FieldDataErrorTypes, FieldDataTypes, LoginResponseData, ResponseType, User } from "../types/login.types";
import { UserLogin, UserLogout } from "../services/login.service";
import { ToastType } from "../types/toast.types";

class LoginStore {
    user: User = {
        username: ""
    }
    fieldData: FieldDataTypes = {
        username: '',
        password: '',
    }
    fieldErrors: FieldDataErrorTypes = {
        usernameError: '',
        passwordError: ''
    }
    loader: boolean = false;
    error: string = '';
    isToastVisible: boolean = false;
    toastMessage: string = '';
    toastType: ToastType = 'success';
    isUserLogged: boolean = false;
    userDataToken: string = '';

    constructor() {
        makeObservable(this, {
            fieldData: observable,
            fieldErrors: observable,
            loader: observable,
            isToastVisible: observable,
            toastMessage: observable,
            toastType: observable,
            isUserLogged: observable,
            userDataToken: observable,
            handleSubmit: action,
            setUsername: action,
            setPassword: action,
            logIn: action,
            hideToast: action,
            showToast: action,

        });

        this.checkLoginStatus();
    }

    logIn = async (navigate: (path: string) => void) => {
        this.loader = true;
        try {
            const params = {
                username: this.fieldData.username,
                password: this.fieldData.password,
            }
            const response: ResponseType<LoginResponseData> = await UserLogin(params)
            if (response.status == 'fail') {
                this.isUserLogged = false;
                this.userDataToken = '';
                this.showToast('Invalid username or password!', 'error');
            } else {
                this.isUserLogged = true;
                this.userDataToken = response?.data?.token ?? '';
                localStorage.setItem('isUserLogged', 'true');
                localStorage.setItem('userToken', response?.data?.token ?? '');
                this.showToast('Login successful!', 'success');
                navigate('/dashboard');
            }

            runInAction(() => {
                this.user.username = response.data?.username ?? ''
                this.error = String(response.error)
                this.loader = false
            })

        } catch (error: unknown) {
            this.loader = false
            this.error = String(error)
        }
    }
    setUsername = (name: string) => {
        this.fieldErrors.usernameError = ''
        this.fieldData.username = name;
    }

    setPassword = (password: string) => {
        this.fieldErrors.passwordError = ''
        this.fieldData.password = password;
    }


    handleSubmit = (navigate: (path: string) => void) => {
        this.fieldErrors.passwordError = '';
        this.fieldErrors.usernameError = '';

        let hasError = false;

        if (this.fieldData.username === '') {
            this.fieldErrors.usernameError = 'Username can not be empty';
            hasError = true;
        }

        if (this.fieldData.password === '') {
            this.fieldErrors.passwordError = 'Password can not be empty';
            hasError = true;
        }

        if (!hasError) {
            this.logIn(navigate);
        }

    }
    hideToast = () => {
        this.isToastVisible = false;
    }
    showToast = (message: string, type: ToastType) => {
        this.toastMessage = message;
        this.toastType = type;
        this.isToastVisible = true;

        setTimeout(() => {
            this.hideToast();
        }, 3000);
    };

    checkLoginStatus = () => {
        const isLogged = localStorage.getItem('isUserLogged') === 'true';
        const token = localStorage.getItem('userToken');
        this.isUserLogged = isLogged;
        this.userDataToken = token ?? ''
    };

    logOut = async (navigate: (path: string) => void) => {
        this.loader = true;
        try {

            const response: ResponseType = await UserLogout()
            if (response.status == 'fail') {
                this.isUserLogged = true;
                this.showToast('Logout failed', 'error');
            } else {
                this.isUserLogged = false;
                this.userDataToken = '';
                localStorage.setItem('isUserLogged', 'false');
                localStorage.removeItem('userToken');
                this.showToast('Logout successful!', 'success');
                navigate('/');
            }
            runInAction(() => {
                this.loader = false
            })

        } catch (error: unknown) {
            this.loader = false
            this.error = String(error)
        }
    }
}

const loginStore = new LoginStore();
export default loginStore;