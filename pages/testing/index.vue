<template>
    <div class="buy_rides inner transaction" style="padding-top: 200px;">
        <section id="banner">
        </section>

        <!-- <figure>$29/month</figure>
    <section id="errors" class="errors"></section>
        <form method="post" action="/api/subscriptions/new" @submit.prevent="test()">
        <button id="subscribe">Subscribe with PayPal</button>
        <input type="hidden" id="recurly-token" name="recurly-token">
      </form> -->


      <form method="post" action="/api/subscriptions/new">
      <label for="plan">Plan</label>
      <select id="plan" data-recurly="plan">
        <option value="testplan" selected>Test Plan</option>
      </select>

      <label for="plan-quantity">Quantity</label>
      <input type="text" data-recurly="plan_quantity" id="plan-quantity" value="2">

      <label for="number">Card Number</label>
      <div data-recurly="number" id="number"></div>
      <label for="month">Month</label>
      <div data-recurly="month" id="month"></div>
      <label for="year">Year</label>
      <div data-recurly="year" id="year"></div>
      <label for="cvv">CVV</label>
      <div data-recurly="cvv" id="cvv"></div>
      <label for="first_name">First Name</label>
      <input type="text" data-recurly="first_name" id="first_name" name="first-name">
      <label for="last_name">Last Name</label>
      <input type="text" data-recurly="last_name" id="last_name" name="last-name">

      <p>Billing Information</p>
      <label for="billing_first_name">First Name</label>
      <input id="billing_first_name" type="text" data-recurly="first_name" name="billing_first_name">
      <label for="billing_last_name">Last Name</label>
      <input id="billing_last_name" type="text" data-recurly="last_name" name="billing_last_name">
      <label for="billing_address_1">Address 1</label>
      <input id="billing_address_1" type="text" data-recurly="address1" name="billing_address_1">
      <label for="billing_address_2">Address 2</label>
      <input id="billing_address_2" type="text" data-recurly="address2" name="billing_address_2">
      <label for="billing_city">City</label>
      <input id="billing_city" type="text" data-recurly="city" name="city">
      <label for="billing_state">State</label>
      <input id="billing_state" type="text" data-recurly="state" name="state">
      <label for="postal_code">Postal Code</label>
      <input type="text" data-recurly="postal_code" id="postal_code">

      <label for="country">Country</label>
      <select id="country" data-recurly="country">
        <option value="PH">Philippines</option>
        <option value="US">United States</option>
        <option value="GB">Great Britain</option>
      </select>

      <p id="addons-title">Add-ons</p>
      <p id="addons"></p>

      <p>Coupon</p>
      <input type="text" data-recurly="coupon" value="test">

      <input type="radio" value="USD" name="currency" data-recurly="currency" id="currency-USD" checked>
      <label for="currency-USD">USD</label>
      <input type="radio" value="GBP" name="currency" data-recurly="currency" id="currency-GBP">
      <label for="currency-GBP">GBP</label>

      <input type="hidden" data-recurly="token" name="recurly-token">

      <p>
        Due now
      </p>
      <ul>
        <li>
          Discount:
          <span data-recurly="currency_symbol"></span>
          <span data-recurly="discount_now"></span>
        </li>
        <li>
          Subtotal:
          <span data-recurly="currency_symbol"></span>
          <span data-recurly="subtotal_now"></span>
        </li>
        <li>
          Tax:
          <span data-recurly="currency_symbol"></span>
          <span data-recurly="taxes_now"></span>
        </li>
        <li>----</li>
        <li>
          Total:
          <span data-recurly="currency_symbol"></span>
          <span data-recurly="total_now"></span>
        </li>
      </ul>
      <p>
        Due later
      </p>
      <ul>
        <li>
          Discount:
          <span data-recurly="currency_symbol"></span>
          <span data-recurly="discount_next"></span>
        </li>
        <li>
          Subtotal:
          <span data-recurly="currency_symbol"></span>
          <span data-recurly="subtotal_next"></span>
        </li>
        <li>
          Tax:
          <span data-recurly="currency_symbol"></span>
          <span data-recurly="taxes_next"></span>
        </li>
        <li>----</li>
        <li>
          Total:
          <span data-recurly="currency_symbol"></span>
          <span data-recurly="total_next"></span>
        </li>
      </ul>
      <button id="subscribe">Subscribe</button>
      <div id="errors"></div>
    </form>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                paypal: null
            }
        },
        mounted () {
            const me = this
            recurly.configure({
                publicKey: 'ewr1-IeGOwa2IupbnSdFc9IRwpc',
                style: {
          all: {
            fontFamily: 'Open Sans',
            fontSize: '1rem',
            fontWeight: 'bold',
            fontColor: '#2c0730'
          },
          number: {
            placeholder: 'Card number'
          },
          month: {
            placeholder: 'mm'
          },
          year: {
            placeholder: 'yy'
          }
        }
      })
            // When a customer hits their 'enter' key while in a field
      recurly.on('field:submit', function (event) {
        $('form').submit();
      });

      // On form submit, we stop submission to go get the token
      $('form').on('submit', function (event) {

        // Prevent the form from submitting while we retrieve the token from Recurly
        event.preventDefault();

        // Reset the errors display
        $('#errors').text('');
        $('input').removeClass('error');

        // Disable the submit button
        $('button').prop('disabled', true);

        var form = this;

        // Now we call recurly.token with the form. It goes to Recurly servers
        // to tokenize the credit card information, then injects the token into the
        // data-recurly="token" field above
        recurly.token(this, function (err, token) {

          // send any errors to the error function below
          if (err) error(err);

          // Otherwise we continue with the form submission
          else form.submit();

        });
      });

      // Now we set up the pricing module
      var pricing = recurly.Pricing.Checkout();
      var form = $('form');

      // For debugging: when pricing changes or emits an error, we'll just send it to the console
      // This should be disabled or removed for your production environment
      if (console) {
        pricing.on('change', function (price) { console.info(price); });
        pricing.on('error', function (e) { console.error(e); });
      }

      // Calling .attach will bind the pricing module to the form.
      pricing.attach(form);

      // Now for dynamic addon selection. Depending on the plan selected, we
      // want to switch out which addons the customer can select.

      // This listens for the plan being set on the pricing module, then loops
      // over its addons to change which are displayed
      pricing.on('set.plan', function (plan) {
        var buffer = '';

        if (plan.addons) {
          buffer = $.map(plan.addons, function (addon) {
            // usage add-ons need to be displayed separately
            if (addon.add_on_type === 'usage') return;
            return '<label for="addon-' + addon.code + '">' + addon.name + ' ('
                 + '<span data-recurly="currency_symbol"></span>'
                 + '<span data-recurly="addon_price" data-recurly-addon="' + addon.code + '"></span>'
                 + ')</label>'
                 + '<input type="text" data-recurly="addon" data-recurly-addon="' + addon.code + '" value="0" id="addon-' + addon.code + '">';
          }).join('');
        }

        // Populate the addon list and show/hide the addon label accordingly
        $('#addons').html(buffer);
        $('#addons-title')[buffer ? 'show' : 'hide']();

        pricing.attach(form);
      });

      // A simple error handling function to expose errors to the customer
      function error (err) {
        console && console.error(err);
        $('#errors').text(err.message);
        $('button').prop('disabled', false);
      }
        },
        head () {
            return {
                title: 'Ride Revolution | Admin Panel',
                script: [
                    { src: 'https://code.jquery.com/jquery-3.2.1.slim.min.js' }
                ],
                link: [
                    { rel: 'stylesheet', href: 'https://js.recurly.com/v4/recurly.css' }
                ]
            }
        }
        // methods: {
        //     error (err) {
        //         console && console.error(err);
        //          document.getElementById('errors').innerText = 'There was a problem intializing the PayPal transaction! Please try again in a few moments.'
        //         document.querySelector('input').disabled = false
        //     },
        //     test () {
        //         const me = this
        //         // Reset the errors display
        //         document.getElementById('errors').innerText = ''
        //         document.querySelector('input').classList.remove('error')
        //
        //         // Disable the submit button
        //         document.querySelector('input').disabled = true
        //
        //         // Start the paypal checkout flow
        //         me.paypal.start();
        //     }
        // },
        // mounted () {
        //     const me = this
        //     recurly.configure('ewr1-IeGOwa2IupbnSdFc9IRwpc')
        //     me.paypal = recurly.PayPal({
        //         display: { displayName: 'My product' }
        //       });
        //       // Handle any errors that occur during the paypal checkout
        //        me.paypal.on('error', me.error);
        //        // Handle token generation. This event fires once the customer has finished the PayPal flow
        //        me.paypal.on('token', function (token) {
        //          // Update the token hidden field
        //          console.log(token);
        //          document.getElementById('recurly-token').value = token.id
        //
        //          // Now we submit the form directly, bypassing the jQuery listener below
        //          me.test()
        //        });
        // }
    }
</script>

<style>

      * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
        -o-box-sizing: border-box;
        box-sizing: border-box;
      }

      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }

      body {
        background: -webkit-linear-gradient(-30deg, #e1e3e6, #ebeff8);
        background: -moz-linear-gradient(-30deg, #e1e3e6, #ebeff8);
        background: -ms-linear-gradient(-30deg, #e1e3e6, #ebeff8);
        background: -o-linear-gradient(-30deg, #e1e3e6, #ebeff8);
        background: linear-gradient(-30deg, #e1e3e6, #ebeff8);
        font-family: 'Open Sans', Helvetica, sans-serif;
        text-align: center;
      }

      section {
        margin: 0 auto 1em;
        max-width: 16rem;
      }

      section:first-child {
        overflow: auto;
      }

      section.errors {
        color: #e43c29;
      }

      form {
      }

      label {
        display: block;
        text-align: left;
        width: 100%;
        margin: 0 0 0.2rem;
        color: #2c0730;
        font-size: 0.8rem;
        font-weight: bold;
        text-transform: uppercase;
        clear: left;
      }

      input {
        position: relative;
        width: 100%;
        border: 2px solid #c2c2c2;
        background: transparent;
        padding: 0.5rem;
        margin: 0 0 1rem;
        outline: none;
        font-family: 'Open Sans', Helvetica, sans-serif;
        font-size: 1rem;
        font-weight: bold;
        box-shadow: none;
        border-radius: 0;
        color: #c2c2c2;
        -webkit-appearance: none;
        -webkit-transition: border-color 0.3s;
        -moz-transition: border-color 0.3s;
        -ms-transition: border-color 0.3s;
        -o-transition: border-color 0.3s;
        transition: border-color 0.3s;
      }

      input:focus {
        border-color: #2c0730;
        color: #2c0730;
        z-index: 10;
      }

      input.error {
        border-color: #e43c29;
      }

      div.error .recurly-hosted-field {
        border: 2px solid #e43c29;
      }

      div.date {
        display: inline-block;
        width: 4.5rem;
        float: left;
        text-align: left;
        margin-right: -2px;
      }

      div.date label {
        display: inline-block;
        clear: none;
      }

      div.date input {
        display: inline-block;
      }

      button {
        border: none;
        width: 100%;
        background: #2c0730;
        outline: none;
        padding: 1rem;
        font-family: 'Open Sans', Helvetica, sans-serif;
        font-size: 1rem;
        font-weight: bold;
        letter-spacing: 0.15rem;
        color: #f5f5f5;
        cursor: pointer;
        -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        -moz-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        -ms-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        -o-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        -webkit-transition: opacity 0.3s;
        -moz-transition: opacity 0.3s;
        -ms-transition: opacity 0.3s;
        -o-transition: opacity 0.3s;
        transition: opacity 0.3s;
      }

      button:disabled {
        opacity: 0.6;
      }

      figure {
        margin: 0;
      }

      figure.logo {
        width: 9rem;
        height: 9rem;
        background: #f5f5f5;
        border-radius: 100px;
        margin: 2rem auto;
        line-height: 9rem;
        letter-spacing: 0.1rem;
        font-size: 1.5rem;
        color: #2c0730;
        -webkit-transition: border-radius 0.5s, width 0.5s, height 0.5s, margin 0.5s, line-height 0.5s;
        -moz-transition: border-radius 0.5s, width 0.5s, height 0.5s, margin 0.5s, line-height 0.5s;
        -ms-transition: border-radius 0.5s, width 0.5s, height 0.5s, margin 0.5s, line-height 0.5s;
        -o-transition: border-radius 0.5s, width 0.5s, height 0.5s, margin 0.5s, line-height 0.5s;
        transition: border-radius 0.5s, width 0.5s, height 0.5s, margin 0.5s, line-height 0.5s;
      }

      figure.logo .term {
        line-height: 1em;
        font-size: 0.5em;
        margin-left: -0.25rem;
      }

      figure.success {
        width: 100%;
        background: #30af3b;
        padding: 1rem;
        font-family: 'Open Sans', Helvetica, sans-serif;
        font-size: 1rem;
        font-weight: bold;
        letter-spacing: 0.15rem;
        color: #f5f5f5;
        opacity: 0;
        position: relative;
        top: 4rem;
        -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        -moz-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        -ms-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        -o-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        -webkit-transition: opacity 0.5s 0.25s, top 1s;
        -moz-transition: opacity 0.5s 0.25s, top 1s;
        -ms-transition: opacity 0.5s 0.25s, top 1s;
        -o-transition: opacity 0.5s 0.25s, top 1s;
        transition: opacity 0.5s 0.25s, top 1s;
      }

      @media screen and (max-height: 599px) {
        figure.logo {
          width: 100%;
          height: 3rem;
          margin: 2rem auto 1rem;
          border-radius: 0;
          line-height: 3rem;
        }
      }

      .recurly-hosted-field {
        position: relative;
        width: 100%;
        height: 42px;
        border: 2px solid #c2c2c2;
        background: transparent;
        padding: 0.5rem;
        margin: 0 0 1rem;
        outline: none;
        font-family: 'Open Sans', Helvetica, sans-serif;
        font-size: 1rem;
        font-weight: bold;
        box-shadow: none;
        border-radius: 0;
        color: #c2c2c2;
        -webkit-appearance: none;
        -webkit-transition: border-color 0.3s;
        -moz-transition: border-color 0.3s;
        -ms-transition: border-color 0.3s;
        -o-transition: border-color 0.3s;
        transition: border-color 0.3s;
      }

      .recurly-hosted-field-focus {
        border-color: #2c0730;
        color: #2c0730;
        z-index: 10;
      }

    </style>
