const checkLoginActivatedNow = registrationsList.findIndex(element => element.login === "on")

if(checkLoginActivatedNow != -1){
    window.location.href = "home.html"
}