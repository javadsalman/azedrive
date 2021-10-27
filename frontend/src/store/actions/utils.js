export class LocalStorageAuthUtil {
    getItems() {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const authId = localStorage.getItem('authId')
        return {token, username, authId}
    }

    removeItems(...items) {
        items.forEach(item => {
            localStorage.removeItem(item);
        });
    }

    setItems(kwarg) {
        for (let key in kwarg) {
            if (kwarg[key]) {
                localStorage.setItem(key, kwarg[key]);
            }
        }
    }
}