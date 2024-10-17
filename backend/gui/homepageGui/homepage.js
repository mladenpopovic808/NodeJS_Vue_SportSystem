function initLogout() {
    document.getElementById('logoutHomepage').addEventListener('click', e => {
        document.cookie = `token=null;SameSite=Lax`;
        window.location.href = 'login';
    });
}
