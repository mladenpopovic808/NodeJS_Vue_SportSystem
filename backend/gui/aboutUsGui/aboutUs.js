cookies = document.cookie.split('=');
token = cookies[cookies.length - 1];


function init(){

    fetch("http://localhost:8500/admin/showAboutUs",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
})
        ///samo jedna instanca about us-a ce uvek postojati
        .then(res => res.json())
        .then(data => {
            document.getElementById("aboutUsParagraph").innerHTML = data[0].text;
            })


}
function initUpdate(){
    document.getElementById("aboutUsButton").addEventListener("click",(e)=>{

        

        fetch("http://localhost:8500/admin/updateAboutUs",{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                text: document.getElementById("updateParagraph").value
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.msg ){
                alert(data.msg);
            }
            else{
                alert("About us updated!");
            }
        })
    })

}