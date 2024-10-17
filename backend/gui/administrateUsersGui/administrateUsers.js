const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function init(){
    fetch("http://localhost:8500/admin/users",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
})
        .then(res => res.json())
        .then(data => {
            document.getElementById("showUsersTable").innerHTML = "";
            let table = document.getElementById("showUsersTable");

            if(data.msg){
                alert(data.msg);
            }
            else{
                data.forEach(element => {
                    let row = `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.firstName}</td>
                        <td>${element.lastName}</td>
                        <td>${element.email}</td>
                        <td>${element.username}</td>
                        <td>${element.admin}</td>
                        <td>${element.moderator}</td>
                        </tr>
                    `;
                    table.innerHTML += row;
                })
            }})

     document.getElementById("administrateButton").addEventListener("click", e=>{
        e.preventDefault();
            
        let id = document.getElementById("userId").value;
        let admin= document.getElementById("admin").checked;
        let moderator = document.getElementById("moderator").checked;

        fetch("http://localhost:8500/admin/users/" + id+"/"+admin+"/"+moderator,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
           .then(res => res.json())
              .then(data => {
                    if(data.msg){
                        alert(data.msg);
                    }
                    else{
                        alert("Uspešno ste promijenili korisnika!");
                    }
                }
            ).catch(err => console.log(err.message));
        })   
        
        
        document.getElementById("deleteUserButton").addEventListener("click", e=>{

            let id = document.getElementById("deleteUserId").value;
            fetch("http://localhost:8500/admin/users/" + id,{
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then(res => res.json())
                    .then(data => {
                            if(data.msg){
                             alert(data.msg);
                            }
                            else{
                             alert("Uspešno ste obrisali korisnika!");
                            }
                      }
                 )
                })
 

}

