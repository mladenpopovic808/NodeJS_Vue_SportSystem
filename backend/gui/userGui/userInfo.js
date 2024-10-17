const PORT=8500;//restapi port
const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

///radi
function init(){
    
    fetch("http://localhost:8500/admin/getCurrentUser" , {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then( res => res.json())
    .catch( err => console.log(err.message))
    .then( user => {
        document.getElementById("firstName").innerHTML = "Ime : "+user.firstName;
        document.getElementById("lastName").innerHTML = "Prezime : "+user.lastName;
        document.getElementById("username").innerHTML = "Username : "+user.username;
        document.getElementById("email").innerHTML = "Email : "+user.email;
        document.getElementById("admin").innerHTML = "Admin: "+user.admin;
        document.getElementById("moderator").innerHTML = "Moderator : "+user.moderator;
    })
    .catch( err => console.log(err.message) );

}

//korisnik sam sebi menja informacije
function userChangeInfo(){
    document.getElementById("submitButton").addEventListener("click", (e) => {
        e.preventDefault();
        ///korisnikov unos
        ///cita dobro,provereno
        const obj = {
            firstName:document.getElementById("firstName").value,
            lastName:document.getElementById("lastName").value,
            username:document.getElementById("username").value,
            email:document.getElementById("email").value,
            password:document.getElementById("password").value,
            admin:document.getElementById("admin").checked,
            moderator:document.getElementById("moderator").checked,
        };
        
        fetch("http://localhost:8500/admin/selfchangeUserInfo" , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(obj)
        }).then( res => res.json())
        .then( user => {})
        .catch( err => alert(err.message) );
        

        


    

    })


}