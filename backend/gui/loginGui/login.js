function init() {

    document.getElementById('loginButton').addEventListener('click', e => {
        e.preventDefault();
        
        const data = {
            username: document.getElementById('loginUsername').value,
            password: document.getElementById('loginPassword').value
        };

        fetch('http://127.0.0.1:9000/authLogin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    ///preusmerava te na homepage
                    window.location.href = 'Homepage';
                }
            })
            
    });
}