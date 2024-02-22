export async function createUserApi(data) {
  const params = {
    role_id: 3,
    first_name: data.name,
    last_name: data.lastName,
    email: data.email,
    mobile: data.phoneNumber,
    password: data.password,
  };

  //post request to api to create the new user
  const response = await fetch(`https://stagrecords.swasth.net/api/signup`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const d = await response.json();

  if (d.status === "failed") {
    return new Promise((resolve, reject) => {
      reject({ data: d.message });
    });
  } else {
    return new Promise((resolve, reject) => {
      resolve({ data: null, message: d.message });
    });
  }
}

export async function loginUserApi(data) {
  //post request to api to create the new user
  const response = await fetch(`https://stagrecords.swasth.net/api/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const d = await response.json();

  console.log(d);

  // if (d.status === "failed") {
  //   console.log("failed");
  //   return new Promise((resolve, reject) => {
  //     reject({ data: null });
  //   });
  // } else {
  return new Promise((resolve, reject) => {
    localStorage.setItem("userId", d.user_id);
    localStorage.setItem("token", d.token);
    const newUser = {
      userId: d.user_id,
      token: d.token,
    };

    resolve({ data: newUser });
  });
}
// }

export async function editUserApi(data) {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("userId");

  const params = {
    first_name: data.name,
    last_name: data.lastName,
    email: data.email,
    mobile: data.phoneNumber,
  };
  const response = await fetch(
    `https://stagrecords.swasth.net/api/editprofile`,
    {
      method: "PUT",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "text/plain",
        swasthtoken: token,
      },
    }
  );
  const d = await response.data();
  console.log(d);
  return new Promise((resolve, reject) => {
    const newUser = {
      userId: d.user_id,
      token: d.token,
    };

    resolve({ data: newUser });
  });
}

export async function logOutUserApi(data) {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("userId");

  // console.log(token + " " + user_id);

  // const response = await fetch(`https://stagrecords.swasth.net/api/logout`, {
  //   method: "POST",
  //   body: JSON.stringify({ user_id: user_id }),
  //   headers: {
  //     "Content-Type": "text/plain",
  //     swasthtoken: token,
  //     value: "4498420eed8ef1dd07e1b7e0d0eccb74adc909fd",
  //     type: "default",
  //     disabled: true,
  //   },
  // });
  // const d = await response.data();
  // console.log(d);

  return new Promise((resolve, reject) => {
    localStorage.clear();
    resolve({ data: null });
  });
}
