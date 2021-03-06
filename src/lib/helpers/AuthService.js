// @flow

class AuthService {
	static async storeUser(userName: string) {
		try {
			await localStorage.setItem('myChatUsername', userName);
		} catch (error) {
			console.error(error);
		}
	}

	static async signOut() {
		await localStorage.removeItem('myChatUsername');
	}
}

export default AuthService;
