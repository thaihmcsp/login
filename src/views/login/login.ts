async function login() {
  try {
    const username = $("#username").val();
    const password = $("#password").val();

    const response = await $.ajax({
      type: "POST",
      url: "/user/login",
      data: { username, password },
    });

    setCookie(cname, response.token, exdays);

    window.location.href = `${host}`;
  } catch (error: any) {
    alert(error.responseJSON.message);
  }
}
