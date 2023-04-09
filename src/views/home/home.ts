const logout = async () => {
  try {
    const res = await $.ajax({
      url: `${host}/user/logout`,
      type: "PATCH",
    });

    delete_cookie(cname);

    window.location.href = `${host}/login`;
  } catch (error: any) {
    alert(error.responseJSON.message);
  }
};
