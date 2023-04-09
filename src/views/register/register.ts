const register = async () => {
  try {
    const username = $("#username").val();
    const password = $("#password").val();
    const confirm_password = $("#confirm_password").val();

    console.log(username, password, confirm_password);
    if (password !== confirm_password) {
      return alert("password not match, please check your password");
    }

    await $.ajax({
      url: `${host}/user/register`,
      type: "POST",
      data: { username, password },
    });

    const isLogin = confirm("register success. Process to login page?");
    if (isLogin) {
      window.location.href = `${host}/login`;
    }
  } catch (error: any) {
    alert(error.responseJSON.message);
  }
};
