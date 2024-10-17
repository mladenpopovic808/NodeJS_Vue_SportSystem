const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function initAddMatch(){
    
    ///playerid x2
    ///podloga
    ///turniri id

    fetch("http://localhost:8500/admin/showPlayers",{
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token,
        }
    })
        .then(res => res.json())
        .then(data => {
            let select = document.getElementById("playerOne");
            let select2= document.getElementById("playerTwo");
            if(data.msg){
                alert(data.msg);
            }
            else{
                data.forEach(element => {
                    ///ne moze jedna opcija da se nalazi u 2 selecta
                    let option = document.createElement("option");
                    let option2= document.createElement("option");
                    option2.value= element.id;
                    option2.text= element.id;
                    option.value = element.id;
                    option.text = element.id;
                    select.appendChild(option);
                    select2.appendChild(option2);
                })
            }
        })
        .catch(err => console.log(err.msg));
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
                        ///ne moze jedna opcija da se nalazi u 2 selecta
                        let option = document.createElement("option");
                        let option2= document.createElement("option");
                        option2.value= element.id;
                        option2.text= element.id;
                        option.value = element.id;
                        option.text = element.id;
                        select.appendChild(option);
                        
                    })
                }
                
        })
        let select=document.getElementById("courtType");
        let option=document.createElement("option");
        option.value="SLJAKA";
        option.text="SLJAKA";
        select.appendChild(option);
        let option2=document.createElement("option");
        option2.value="BETON";
        option2.text="BETON";
        select.appendChild(option2);
        let option3=document.createElement("option");
        option3.value="TRAVA";
        option3.text="TRAVA";
        select.appendChild(option3);

                


    document.getElementById("addMatchBtn").addEventListener("click", e=>{

        e.preventDefault();
        const club = {
            playerOneId: document.getElementById("playerOne").value,
            playerTwoId: document.getElementById("playerTwo").value,
            tournamentId: document.getElementById("tournamentId").value,
            courtType: document.getElementById("courtType").value

        };
        
    
        ///saljemo auth.js-u
        fetch("http://localhost:8500/admin/createMatch",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(club)
         })
            .then(res => res.json())
            .then(obj => {
                
                if(obj.msg)
                    alert(obj.msg)
                else
                    alert("Match added successfully!");
               
            }).catch(err => console.log(err.message));
            alert("Match added successfully!");
}
)}

function initShowMatches(){
    fetch("http://localhost:8500/admin/showMatches",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
})
        .then(res => res.json())
        .then(data => {
            document.getElementById("showMatchesTable").innerHTML = "";
            let table= document.getElementById("showMatchesTable");

            if(data.msg){
                
                alert(data.msg);
            }
            else{
                data.forEach(element => {
                    let row = `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.playerOneId}</td>
                        <td>${element.playerTwoId}</td>
                        <td>${element.tournamentId}</td>
                        <td>${element.courtType}</td>
                        </tr>
                    `;
                    
                    table.innerHTML += row;
                })
            }})
        }
function initDeleteMatch(){

    fetch("http://localhost:8500/admin/showMatches",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(res => res.json())
        .then(data => {
            let select = document.getElementById("matchId");
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


    document.getElementById("button").addEventListener("click", e=>{
    
    const id = document.getElementById("matchId").value;
    fetch("http://localhost:8500/admin/deletematch/"+id,{
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
                alert("Match deleted successfully!");
        })  
})
}
