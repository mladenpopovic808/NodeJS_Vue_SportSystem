cookies = document.cookie.split('=');
token = cookies[cookies.length - 1];


function init(){

    fetch("http://localhost:8500/admin/showInfo",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
})
        ///samo jedna instanca about us-a ce uvek postojati
        .then(res => res.json())
        .then(data => {

            document.getElementById("phoneNumber").innerHTML ="Broj telefona: "+ data[0].phoneNumber;
            document.getElementById("email").innerHTML = "Email: "+data[0].email;
            document.getElementById("street").innerHTML = "Ulica : "+data[0].street;
            document.getElementById("numberOfStreet").innerHTML = "Broj ulice : "+data[0].numberOfStreet;
            document.getElementById("fax").innerHTML = "Fax: "+data[0].fax;
            })


}
function initUpdate(){
    document.getElementById("btn").addEventListener("click",(e)=>{
        e.preventDefault();

        

        fetch("http://localhost:8500/admin/updateInfo",{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                street: document.getElementById("street").value,
                numberOfStreet: document.getElementById("numberOfStreet").value,
                phoneNumber: document.getElementById("phoneNumber").value,
                fax: document.getElementById("fax").value,
                email: document.getElementById("email").value
        })
    })
        .then(res => res.json())
        .then(data => {
            if(data.msg ){
                alert(data.msg);
            }
            else{
                alert("Info(contact) updated!");
            }
        })
    })

}