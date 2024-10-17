const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function init(){
    
   
    fetch("http://localhost:8500/admin/showClubs",{
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token,
        }
    })
        .then(res => res.json())
        .then(data => {
            let select = document.getElementById("tournamentClubId");
            if(data.msg){
                alert(data.msg);
            }
            else{
                data.forEach(element => {
                    let option = document.createElement("option");
                    option.value = element.id;
                    option.text = element.id;
                    select.appendChild(option);
                })
            }
        })

    document.getElementById("addTournamentBtn").addEventListener("click", e=>{

        e.preventDefault();
        const tournament = {
            name: document.getElementById("tournamentName").value,
            prizeMoney: document.getElementById("tournamentMoney").value,
            points: document.getElementById("tournamentPoints").value,
            clubId: document.getElementById("tournamentClubId").value,
        };
        alert(tournament.clubId)
        
        
    
        ///saljemo auth.js-u
        fetch("http://localhost:8500/admin/createTournament",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(tournament)
         })
            .then(res => res.json())
            .then(obj => {
                if(obj.msg)
                    alert(obj.msg)
                else
                    alert("Tournament added successfully!");
               
            }).catch(err => console.log(err.message));
}
)}

function initUpdateTournament(){
    fetch("http://localhost:8500/admin/showTournaments",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(res => res.json())
        .then(data => {
            let select = document.getElementById("tournamentId");
            if(data.msg){
                alert(data.msg);
            }
            else{
                data.forEach(element => {
                    let option = document.createElement("option");
                    option.value = element.id;
                    option.text = element.id;
                    select.appendChild(option);
                })
            }
        })

        fetch("http://localhost:8500/admin/showClubs",{
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token,
        }
    })
        .then(res => res.json())
        .then(data => {
            let select = document.getElementById("tournamentClubId");
            if(data.msg){
                alert(data.msg);
            }
            else{
                data.forEach(element => {
                    let option = document.createElement("option");
                    option.value = element.id;
                    option.text = element.id;
                    select.appendChild(option);
                })
            }
        })
    document.getElementById("updateTournamentBtn").addEventListener("click", e=>{
        e.preventDefault();
        
            let id= document.getElementById("tournamentId").value
            let name= document.getElementById("tournamentName").value
            let prizeMoney= document.getElementById("tournamentMoney").value
            let points =document.getElementById("tournamentPoints").value
            let clubId =document.getElementById("tournamentClubId").value

            fetch("http://localhost:8500/admin/updateTournament/"+id+"/"+name+"/"+prizeMoney+"/"+points+"/"+clubId,{  
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
                .then(res => res.json())
                .then(data => {
                    if(data.msg){
                        alert(data.msg);
                    }else{
                        alert("Tournament updated successfully!");
                    }
                })
                .catch(err => console.log(err.message));
    })
}

function initShowTournaments(){
    fetch("http://localhost:8500/admin/showTournaments",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
})
        .then(res => res.json())
        .then(data => {
            document.getElementById("tournamentTable").innerHTML = "";
            let table= document.getElementById("tournamentTable");

            if(data.msg){
                alert(data.msg);
            }
            else{
                data.forEach(element => {
                    
                    let row = `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.prizeMoney} $</td>
                        <td>${element.points}</td>
                        <td>${element.clubId}</td>
                        </tr>
                    `;
                    table.innerHTML += row;
                })
            }})
        }
function initDeleteTournament(){

    fetch("http://localhost:8500/admin/showTournaments",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(res => res.json())
        .then(data => {
            let select = document.getElementById("tournamentId");
            if(data.msg){
                alert(data.msg);
            }   
            else{
                data.forEach(element => {
                    let option = document.createElement("option");
                    option.value = element.id;
                    option.text = element.id;
                    select.appendChild(option);
                })
            }
        }) 


    document.getElementById("deleteTournamentBtn").addEventListener("click", e=>{
    
    const id = document.getElementById("tournamentId").value;
    fetch("http://localhost:8500/admin/deleteTournament/"+id,{
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
            }else
                alert("Club deleted successfully!");
        })  
})
}
