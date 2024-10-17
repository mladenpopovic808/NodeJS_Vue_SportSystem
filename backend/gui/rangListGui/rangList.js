
const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function init(){

     ///Uzmem id-jeve svih destinacija i staff-ova i ubacim ih u select opcije
    ///Ubacivanje id-jeva u select opcije
    fetch("http://localhost:8500/admin/showPlayers",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
})
        .then(res => res.json())
        .then(data => {
            document.getElementById("playerTable").innerHTML = "";
            let table= document.getElementById("playerTable");

            if(data.msg){
                alert(data.msg);
            }
            else{
                ///sortirati po poenima
                let rank=1;
                ///po poenima
                let sortedPlayers= data.sort((a,b)=> b.tourPoints-a.tourPoints);
                
                sortedPlayers.forEach(element => {
                    
                    let row = `
                    <tr>
                        <td>${element.id}</td>
                        <td>${rank}</td>
                        <td>${element.name}</td>
                        <td>${element.lastName}</td>
                        <td>${element.clubId}</td>
                        <td>${element.years}</td>
                        <td>${element.tourPoints}</td>
                        </tr>
                    `;
                    rank++
                    table.innerHTML += row;
                })
            }})


    
}