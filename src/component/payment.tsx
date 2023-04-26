import React from 'react';
import {Platform} from 'react-native';
import {WebView} from 'react-native-webview';
// pk_test_51IdudfCvAFj9FKm2BjB9BBL8Os9tP9oShx9SWEZKChOsVUJj2tmoW4suTr1FK8TcqV8g6vzeNo8BPAxC1PGy3Ip1003XooWJb9
const STRIPE_PK =
  'pk_live_51JaGQKLftj9Egum49jLefHwqABwcEvhtdVfFBLJchCvIRIuo9h91mmGPk2DRrCUk77LQzasuPdwtEmBfJUDDdVC400fxdu4ukK';
//'pk_test_51IdudfCvAFj9FKm2BjB9BBL8Os9tP9oShx9SWEZKChOsVUJj2tmoW4suTr1FK8TcqV8g6vzeNo8BPAxC1PGy3Ip1003XooWJb9';
const PaymentView = props => {
  const {image, id, total} = props;

  const onCheckStatus = response => {
    props.onCheckStatus(response);
  };
  const generateAssetsFontCss = (fontFileName, fileFormat) => {
    const fileUri = Platform.select({
      ios: `${fontFileName}.${fileFormat}`,
      android: `file:///android_asset/fonts/${fontFileName}.${fileFormat}`,
    });

    return `
    @font-face {
            font-family: '${fontFileName}';
        src: local('${fontFileName}'), url('${fileUri}') format('${
      fileFormat === 'ttf' ? 'truetype' : 'opentype'
    }');
    }
    `;
  };
  const css = generateAssetsFontCss('Boiling-BlackDemo', 'ttf');
  const html =
    `
                <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style type="text/css">` +
    css +
    `</style>
                <title>Payment Page</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                <link rel="preconnect" href="https://fonts.gstatic.com">
                <link href="https://fonts.googleapis.com/css2?family=Orelega+One&display=swap" rel="stylesheet">
                <script src="https://js.stripe.com/v3/"></script>

                <style>
                ::-webkit-input-placeholder { /* Edge */
                color: white;
                }

                :-ms-input-placeholder { /* Internet Explorer */
                color: white;
                }

                ::placeholder {
                color: white;
                }

                body{
                    position:absolute;
                    left:0px;
                    right:0px;
                    top:0px;
                }
                .membership-container{
                     display:flex;
                     flex-direction: column;
                    
                     align-items: center;
                     margin-top:50px;

                }
                .card{
                    background-color: #000;
                    border-radius: 10px !important;
                    margin-top:45px;
                }
                .card-holder{
                    display: flex;
                    flex-direction: column;
                    height: 100px;
                    justify-content: space-around;
                    background-color: #000;
                    border-radius: 20px;
                    padding: 10px;
                    padding-top: 20px;
                    padding-bottom: 20px;
                    margin-top: 50px;
                    margin-bottom: 50px;

                }
                .card-element{
                    height: 100px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }
                .card-name{
                    padding: 20;
                    color: '#FFF';
                    font-weight: 500;
                    font-size: '25px';
                    background-color: transparent;
                    border: none;

                }
                input {
                    outline:none;
                    color: #FFF;
                    font-size: '25px';
                    font-weight: 500;
                    background-color: transparent;
                    }
                    .row{
                        margin-top: '50px';
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                    }

                    .products-info{
                        width: 100%;
                        padding: 20px;
                        text-align: center;
                        color:#11005D;
                        text-transform: uppercase;

                    }

                    .card-errors{
                        color: red;
                    }
                    .pay-btn{
                        display: flex;
                        height: 50px;
                        justify-content: center;
                        align-items: center;
                        margin: 30px;
                    }
                .custom-btn{
                    background-color:black;
                    color:#FFFFFF !important;
                    box-shadow: none !important;
                    border-radius: 50px !important;
                    outline: none !important;
                }
               

                </style>

            </head>
            <body >

                <!-- product info -->
                <div class="container-fluid">
                    
                    <div class="membership-container">
                    <div class="membership">
                    <span style="color:#0e3529;font-size: 22px;font-family: Boiling-BlackDemo;letter-spacing: 2px;">Order 00${id}<span>
                  </div>
                   
                         
                       
                        <div class="membership" style="margin-top:20px;">
                           <span style="color:#000;font-size: 16px;">
                           Price &nbsp;&nbsp;-&nbsp;&nbsp;&nbsp $${total}
                           <span>
                        </div>
                    </div>

                        <form>
                        <div class="card" >
                            <div class="card-holder">
                                    <input type="text" placeholder="Card Holder Name" id="card-name" class="card-name" />

                                    <div id="card-element" class="card-element">

                                        <div class="form-row">
                                            <label>
                                                <span >Card number</span>
                                                <input type="text" size="20" data-stripe="number">
                                            </label>
                                        </div>

                                        <div class="form-row">
                                        <label>
                                            <span>Expiration (MM/YY)</span>
                                            <input type="text" size="2" data-stripe="exp_month">
                                        </label>
                                        <span> / </span>
                                        <input type="text" size="2" data-stripe="exp_year">
                                        </div>

                                        <div class="form-row">
                                        <label>
                                            <span>CVC</span>
                                            <input type="text" size="4" data-stripe="cvc">
                                        </label>
                                        </div>

                                    </div>

                                </div>

                            </div>
                            <div class="row">
                        <label class="card-errors" id="card-errors"></label>
                    </div>
                                <div class="pay-btn">
                                    <input type="submit" class="btn btn-lg btn-block custom-btn" value="Pay Now" />
                                </div>

                        </form>

                <script>
                    var stripe = Stripe('${STRIPE_PK}');

                    var elements = stripe.elements();

                        var card = elements.create("card", {
                            hidePostalCode: true,
                            style: {
                                base: {
                                color: '#FFF',
                                fontWeight: 500,
                                fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
                                fontSize: '20px',
                                fontSmoothing: 'antialiased',
                                '::placeholder': {
                                    color: '#FFFFFF',
                                },
                                ':-webkit-autofill': {
                                    color: '#e39f48',
                                },
                            },
                            invalid: {
                                color: '#FC011F',
                                '::placeholder': {
                                    color: 'red',
                                },
                            },
                            }
                        });

                        
                        card.mount('#card-element');

                        /**
                         * Error Handling
                         */

                        
                        function showCardError(error){
                            document.getElementById('card-errors').innerHTML = ""
                            if(error){
                                document.getElementById('card-errors').innerHTML = error
                            }
                        }

                        card.on('change', function(event) {
                            if (event.complete) {
                                showCardError()
                                
                            } else if (event.error) {
                                const { message} = event.error
                                
                                showCardError(message)
                            }
                        });

                        card.mount('#card-element');

                        /**
                         * Payment Request Element
                         */
                        var paymentRequest = stripe.paymentRequest({
                            country: "IN",
                            currency: "inr",
                            total: {
                                amount: ${total},
                                label: "Total"
                            }
                        });

                        var form =  document.querySelector('form');

                        form.addEventListener('submit', function(e) {
                            e.preventDefault();

                            var additionalData = {
                                name: document.getElementById('card-name').value,
                                address_line1: undefined,
                                address_city:  undefined,
                                address_state: undefined,
                                address_zip: undefined,
                            };

                            stripe.createToken(card, additionalData).then(function(result) {

                            

                            if (result.token) {
                                window.postMessage(JSON.stringify(result));
                            } else {
                                window.postMessage(JSON.stringify(result));
                            }
                        });

                        })

                </script>

            </body>
            </html>

    `;

  const injectedJavaScript = `(function() {
        window.postMessage = function(data){
            window.ReactNativeWebView.postMessage(data);
        };
    })()`;

  const onMessage = ({nativeEvent}) => {
    const {data} = nativeEvent;
    onCheckStatus(data);
  };

  return (
    <WebView
      javaScriptEnabled={true}
      style={{flex: 1}}
      originWhitelist={['*']}
      source={{html, baseUrl: 'https://pronetworkeratl.com'}}
      injectedJavaScript={injectedJavaScript}
      onMessage={onMessage}
    />
  );
};

export {PaymentView};
