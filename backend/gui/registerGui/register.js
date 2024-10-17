function init(){

    document.getElementById("registracionoDugme").addEventListener("click", e=>{
        e.preventDefault();
        
        const user = {
            firstName: document.getElementById("firstNameRegistration").value,
            lastName: document.getElementById("lastNameRegistration").value,
            username: document.getElementById("usernameRegistration").value,
            email: document.getElementById("emailRegistration").value,
            password: document.getElementById("passwordRegistration").value,
            moderator: document.getElementById("moderatorRegistration").checked,
            admin: document.getElementById("adminRegistration").checked,
        };
        
        

        ///saljemo auth.js-u
        fetch("http://127.0.0.1:9000/authRegister",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
         })
            .then(res => res.json())
            .then(obj => {
                if(obj.msg)
                    alert(obj.msg)
                else
                    document.cookie=`token=${obj.token}`;
                    window.location.href = "login"
                
            })
            








})}