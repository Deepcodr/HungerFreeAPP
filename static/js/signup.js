document.getElementById('usernamefield').addEventListener('input',usernamevalidation);
document.getElementById('passwordfield').addEventListener('input',passwordvalidation);

function usernamevalidation(e){
    var reg=/^[a-z]+[\w]+$/;
    var username=e.target.value;
    if(username.match(reg) && username!=="")
    {
        $('#un-check-icon').css("display","block");
        $('#un-wrong-icon').css("display","none");
        $('#UsernameHelpBlock').css("display","none");
    }
    else if(username!=="")
    {
        $('#un-check-icon').css("display","none");
        $('#un-wrong-icon').css("display","block");
        $('#UsernameHelpBlock').css("display","block");
    }
    else
    {
        $('#un-check-icon').css("display","none");
        $('#un-wrong-icon').css("display","none");
        $('#UsernameHelpBlock').css("display","none");
    }
}

function passwordvalidation(e){
    var username=document.getElementById('usernamefield').value;
    var reg=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var password=e.target.value;
    if(password.match(reg) && password!=="")
    {
        $('#ps-check-icon').css("display","block");
        $('#ps-wrong-icon').css("display","none");
        $('#passwordHelpBlock').css("display","none");
        if(username!=="")
        {
            document.getElementById('registerbtn').classList.remove("disabled");
        }
    }
    else if(password!=="")
    {
        $('#ps-check-icon').css("display","none");
        $('#ps-wrong-icon').css("display","block");
        $('#passwordHelpBlock').css("display","block");
        if(document.getElementById('registerbtn').classList.contains("disabled")){}
        else
        {
            document.getElementById('registerbtn').classList.add("disabled");
        }
    }
    else
    {
        $('#ps-check-icon').css("display","none");
        $('#ps-wrong-icon').css("display","none");
        $('#passwordHelpBlock').css("display","none");
    }
}