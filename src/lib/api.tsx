import Axios from 'axios';
const axios = Axios.create({
  baseURL: 'https://sourcebabooshapp.com/app/api',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});
const authorizedHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: '',
};
const register = payload => {
  const request = `/register`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in register', e);
    });
};
const login = payload => {
  const requrest = `/login`;
  return axios
    .post(requrest, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch login', e);
    });
};
const forgotMail = payload => {
  const requrest = `/forgot`;
  return axios
    .post(requrest, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch forgot', e);
    });
};
const edit = (payload, data1) => {
  console.log('payload to check null data', data1);
  const request = `/edit`;
  return axios
    .post(request, data1, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch edit', e);
    });
};
const verifyPin = payload => {
  const request = `/confirm-code`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch confirm', e);
    });
};
const resetPassword = payload => {
  const request = `/reset`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch reset', e);
    });
};
const picsApi = () => {
  const request = `/homes`;
  return axios
    .get(request)
    .then(({data, status}) => {
      console.log('dsfsf', data);
      console.log('statsdfs', status);
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in picsapi', e);
    });
};

const sourceApi = (payload, data1) => {
  const request = `/submit-source`;
  return axios
    .post(request, data1, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch source', e);
    });
};
const orderList = payload => {
  const request = `/order`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in orderList', e);
    });
};
const paymentApi = payload => {
  const request = `/payment`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in payment', e);
    });
};
const requestList = payload => {
  const request = `/requested`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in orderList', e);
    });
};
const updateToken = payload => {
  const request = `/update-fcmtoken`;
  // const {Auth, ...rest} = payload;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in updateToken', e);
    });
};
const notificationList = payload => {
  const request = `/notification-list`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch notification list', e);
    });
};
const paymentConfirm = payload => {
  const request = `/confirm-payment`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in confirm payment', e);
    });
};
const pdfFile = () => {
  const request = `view-baboosh-pdf`;
  return axios
    .get(request)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch pdf', e);
    });
};
const messageApi = payload => {
  const request = `/mail`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in mail', e);
    });
};

export {
  register,
  edit,
  updateToken,
  messageApi,
  login,
  notificationList,
  picsApi,
  sourceApi,
  paymentConfirm,
  forgotMail,
  pdfFile,
  verifyPin,
  resetPassword,
  paymentApi,
  requestList,
  orderList,
};
