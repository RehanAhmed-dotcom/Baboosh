onCheckStatus = async paymentResponse => {
  const {token} = this.props;
  let response = JSON.parse(paymentResponse);
  if (!response) {
  } else if (response.error) {
  } else {
    this.setState({
      paymentSatus: 'Please wait while confirming your payment!',
      isVisible: true,
    });
    let jsonResponse = JSON.parse(paymentResponse);
    // perform operation to check payment status
    const data = new FormData();
    data.append('tokenId', jsonResponse.token.id);
    try {
      const stripeResponse = await axios.post(
        `${BASE_URL}/api/payment-process`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (stripeResponse) {
        const {data} = stripeResponse;
        const {paid} = data;
        if (paid === true) {
          this.setState(
            {
              paymentSatus: "Payment has been Successful. Now you're a member",
            },
            () => {
              setTimeout(() => {
                this.setState({isVisible: false, pay: false});
                this.props.navigation.navigate('My Account');
              }, 1000);
              setTimeout(() => {
                this._userAccountDetails();
                this.props.setIntialRoute();
                this.props.setPidPayment();
              }, 1500);
            },
          );
        } else {
          this.setState(
            {paymentSatus: 'Payment failed due to some issue'},
            () => {
              setTimeout(() => {
                this.setState({isVisible: false, pay: false});
              }, 2000);
            },
          );
        }
      } else {
        this.setState(
          {paymentSatus: ' Payment failed due to some issue'},
          () => {
            setTimeout(() => {
              this.setState({isVisible: false, pay: false});
            }, 2000);
          },
        );
      }
    } catch (error) {
      this.setState({paymentSatus: ' Payment failed due to some issue'}, () => {
        setTimeout(() => {
          this.setState({isVisible: false, pay: false});
        }, 2000);
      });
    }
  }
};
