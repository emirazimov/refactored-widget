import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { FormProvider, useForm } from "react-hook-form"
import {
  CustomFormInput,
  CustomFormInputForPayment,
  CustomMaskInput,
} from "../CustomFormInput/CustomFormInput"
import { makeStyles } from "@material-ui/core/styles"
import { BackArrowIcon } from "../../../../assets/icons"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Autocomplete from "@material-ui/lab/Autocomplete"
import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import Switch from "@material-ui/core/Switch"
import { Link } from "@material-ui/core"
import { placesApi } from "../../../../api/api"
import TextField from "@material-ui/core/TextField"
import {
  createReservation,
  setPaymentForm,
} from "../../../../Redux/form-reducer"
import PrivacyPolicy from "../../../TermsOfUse/PrivacyPolicy"
import TermsOfUse from "../../../TermsOfUse/TermOfUse"
import { withStyles } from "@material-ui/styles"
// import { Number, Cvc, Expiration } from "react-credit-card-primitives"

import Cleave from "cleave.js/react"
import "./PaymentStyles.css"
import { AntSwitch } from "../AdressForm/AdressFormStyles"
import { useStyles } from "./PaymentStyles"

const SignupSchema = yup.object().shape({
  // greetClientInfo: yup.object().shape({
  //     firstName: yup.string().required('Required'),
  //     phoneNumber: yup.number('Not a number').required('Required'),
  //     lastName: yup.string().required('Required'),
  //     email: yup.string().email('invalid email').required('Required'),
  // }),
  client: yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    address: yup.string().required("Required"),
    zip: yup.number().required("Required").typeError("Not a number"),
    email: yup.string().email("invalid email").required("Required"),
    phoneNumber: yup.number().typeError("Not a number").required("Required"),
  }),
  paymentInfo: yup.object().shape({
    // cardNumber: yup.string().required("Required"),
    month: yup.string().required("Required"),
    cvc: yup.number().required("Required").typeError("Not a number"),
  }),
})

const PaymentUIComponent = ({
  next,
  back,
  total,
  formSummary,
  setPaymentForm,
  SignupSchema,
  states,
  setStates,
  cities,
  setCities,
  statesId,
  setStatesId,
  citiesId,
  setCitiesId,
  checked,
  setChecked,
  register,
  handleSubmit,
  formState,
  errors,
  methods,
  riderDetails,
  setRiderDetails,
  statesIdError,
  setStatesIdError,
  citiesIdError,
  setCitiesIdError,
  cardForPaymentSubmit,
  setCardForPaymentSubmit,
  cardForPaymentSubmitError,
  setCardForPaymentSubmitError,
  restrictAmex,
  setRestrictAmex,
  onSubmit,
  cardType,
  setCardType,
  creditCardNum,
  setCreditCardNum,
  handleNum,
  handleType,
}) => {
  const classes = useStyles()

  const inputStyle = {
    WebkitBoxShadow: "0 0 0 1000px transparent inset",
    height: "0px",
    // width: "100%",
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justify="center" className={classes.contentContainer}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography
                variant="body2"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  // color: "white",
                  fontSize: "22px",
                  lineHeight: "36px",
                }}
                className={classes.paymentTexts}
              >
                Payment
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    // variant="body1"
                    style={{
                      //   marginTop: "7px",
                      color: riderDetails ? "white" : "#757575",
                      fontSize: "15px",
                    }}
                    className={classes.paymentTexts}
                    // style={{}}
                  >
                    Is passenger a cardholder?
                  </Typography>
                </Grid>
                <Grid item>
                  <AntSwitch
                    checked={riderDetails}
                    onClick={() => setRiderDetails(!riderDetails)}
                    color="primary"
                  />
                </Grid>
              </Grid>
            </Grid>
            {!riderDetails && (
              <Grid item style={{ paddingBottom: "20px" }}>
                <Grid item style={{ paddingBottom: "13px" }}>
                  <Typography
                    style={{ fontSize: "15px" }}
                    className={classes.paymentTexts}
                  >
                    Passenger Detail
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    spacing={2}
                    style={{ marginBottom: "8px" }}
                  >
                    <Grid item xs={6}>
                      <CustomFormInputForPayment
                        variant="standard"
                        name="greetClientInfo.firstName"
                        autoComplete="off"
                        placeholder="First Name"
                        className={classes.inputPlaceholderFontSize}
                        defaultValue={formSummary.greetClientInfo.firstName}
                        style={{
                          width: "100%",
                          background: "transparent",
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormInputForPayment
                        variant="standard"
                        name="greetClientInfo.lastName"
                        autoComplete="off"
                        className={classes.inputPlaceholderFontSize}
                        defaultValue={formSummary.greetClientInfo.lastName}
                        placeholder="Last Name"
                        style={{ width: "100%", background: "transparent" }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    spacing={2}
                  >
                    <Grid item xs={6}>
                      <CustomFormInputForPayment
                        name="greetClientInfo.email"
                        variant="standard"
                        autoComplete="off"
                        placeholder="Email"
                        className={classes.inputPlaceholderFontSize}
                        defaultValue={formSummary.greetClientInfo.email}
                        style={{ width: "100%", background: "transparent" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormInputForPayment
                        variant="standard"
                        name="greetClientInfo.phoneNumber"
                        autoComplete="off"
                        defaultValue={formSummary.greetClientInfo.phoneNumber}
                        placeholder="Phone Number"
                        className={classes.inputPlaceholderFontSize}
                        style={{ width: "100%", background: "transparent" }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid item>
              <Grid item style={{ paddingBottom: "13px" }}>
                <Typography
                  style={{ fontSize: "15px" }}
                  className={classes.paymentTexts}
                >
                  Cardholder Information
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                justify="space-between"
                spacing={2}
              >
                <Grid item xs={6}>
                  <CustomFormInputForPayment
                    variant="standard"
                    name="client.firstName"
                    autoComplete="off"
                    className={classes.inputPlaceholderFontSize}
                    defaultValue={formSummary.client.firstName}
                    style={{
                      fontSize: "14px",
                      width: "100%",
                      background: "transparent",
                    }}
                    placeholder="First Name"
                    error={errors.client?.firstName ? true : false}
                  />
                  {errors.client?.firstName && (
                    <p className={classes.error}>
                      {errors.client?.firstName.message}
                    </p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <CustomFormInputForPayment
                    variant="standard"
                    name="client.lastName"
                    autoComplete="off"
                    placeholder="Last Name"
                    className={classes.inputPlaceholderFontSize}
                    defaultValue={formSummary.client.lastName}
                    style={{ width: "100%", background: "transparent" }}
                    error={errors.client?.lastName ? true : false}
                  />
                  {errors.client?.lastName && (
                    <p className={classes.error}>
                      {errors.client?.lastName.message}
                    </p>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-between"
                spacing={2}
              >
                <Grid item xs={6}>
                  <CustomFormInputForPayment
                    name="client.email"
                    variant="standard"
                    autoComplete="off"
                    className={classes.inputPlaceholderFontSize}
                    placeholder="Email"
                    style={{ width: "100%", background: "transparent" }}
                    defaultValue={formSummary.client.email}
                    error={errors.client?.email ? true : false}
                  />
                  {errors.client?.email && (
                    <p className={classes.error}>
                      {errors.client?.email.message}
                    </p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <CustomFormInputForPayment
                    variant="standard"
                    name="client.phoneNumber"
                    autoComplete="off"
                    className={classes.inputPlaceholderFontSize}
                    defaultValue={formSummary.client.phoneNumber}
                    placeholder="Phone Number"
                    style={{ width: "100%", background: "transparent" }}
                    error={errors.client?.phoneNumber ? true : false}
                  />
                  {errors.client?.phoneNumber && (
                    <p className={classes.error}>
                      {errors.client?.phoneNumber.message}
                    </p>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <CustomFormInputForPayment
                name="client.address"
                variant="standard"
                autoComplete="off"
                className={classes.inputPlaceholderFontSize}
                style={{ height: "100%", background: "transparent" }}
                placeholder="Address"
                defaultValue={formSummary.client.address}
                fullWidth
                error={errors.client?.address ? true : false}
              />
            </Grid>
            {errors.client?.address && (
              <p style={{ marginLeft: "10px" }} className={classes.error}>
                {errors.client?.address.message}
              </p>
            )}
            <Grid item>
              <Autocomplete
                id="combo-box-demo"
                options={states}
                defaultValue={null}
                autoComplete="off"
                autoHighlight
                disablePortal
                className={classes.mainAutocompleteClass}
                InputProps={{
                  classes: {
                    root: classes.inputRootAutocomplete2,
                  },
                }}
                classes={{
                  popupIndicator: classes.popupIndicator,
                  option: classes.option,
                  paper: classes.selectedOption,
                }}
                getOptionLabel={(option) => option.name}
                renderOption={(option) => (
                  <div style={{ fontSize: "14px" }}>
                    <span style={{ fontSize: "14px" }}>{option.code}</span>
                    {option.name} ({option.code})
                  </div>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    className={classes.inputPlaceholderFontSize}
                    placeholder="State"
                    // variant="standard"
                    style={{ background: "transparent" }}
                    autoComplete="off"
                    InputProps={{
                      ...params.InputProps,
                      style: { inputStyle },
                      classes: {
                        root: classes.inputRootAutocomplete,
                        underline: classes.noBorder,
                        input: classes.input,
                      },
                      // disableUnderline: true,
                    }}
                  />
                )}
                onChange={(event, newValue) => {
                  newValue ? setStatesId(newValue.id) : setStatesId(null)
                }}
                name="stateId"
              />
              {statesIdError && <p className={classes.error}>Required</p>}
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-between"
                spacing={2}
              >
                <Grid item xs={6}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={cities}
                    key={statesId}
                    autoComplete="off"
                    defaultValue={null}
                    autoHighlight
                    disablePortal
                    getOptionLabel={(option) => option.name}
                    className={classes.mainAutocompleteClass}
                    classes={{
                      popupIndicator: classes.popupIndicator,
                      option: classes.option,
                      paper: classes.selectedOption,
                    }}
                    renderOption={(option) => (
                      <div style={{ fontSize: "13px" }}>
                        <span style={{ fontSize: "14px" }}>{option.code}</span>
                        {option.name} ({option.code})
                      </div>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        className={classes.inputPlaceholderFontSize}
                        placeholder="Cities"
                        variant="standard"
                        style={{ background: "transparent" }}
                        InputProps={{
                          ...params.InputProps,
                          style: { inputStyle },
                          classes: {
                            root: classes.inputRootAutocomplete,
                            underline: classes.noBorder,
                            input: classes.input,
                          },
                          // disableUnderline: true,
                        }}
                      />
                    )}
                    onChange={(event, newValue) => {
                      newValue ? setCitiesId(newValue.id) : setCitiesId(null)
                    }}
                    name="cityId"
                  />
                  {citiesIdError && <p className={classes.error}>Required</p>}
                </Grid>
                <Grid item xs={6}>
                  <CustomFormInputForPayment
                    variant="standard"
                    name="client.zip"
                    autoComplete="off"
                    className={classes.inputPlaceholderFontSize}
                    placeholder="ZIP"
                    style={{ width: "100%", background: "transparent" }}
                    defaultValue={formSummary.client.zip}
                    error={errors.client?.address ? true : false}
                  />
                  {errors.client?.zip && (
                    <p className={classes.error}>
                      {errors.client?.zip.message}
                    </p>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                style={{ fontSize: "15px" }}
                className={classes.paymentTexts}
              >
                Card information
              </Typography>
            </Grid>
            <Grid item>
              {/* <CustomMaskInput
                name="paymentInfo.cardNumber"
                mask="9999-9999-9999-9999"
                autoComplete="off"
                defaultValue={formSummary.paymentInfo.cardNumber}
              >
                {() => (
                  <TextField
                    variant="standard"
                    className={classes.inputPlaceholderFontSize}
                    placeholder="Card number/0000 0000 0000 0000"
                    autoComplete="off"
                    style={{ background: "transparent" }}
                    fullWidth
                    error={errors.paymentInfo?.cardNumber ? true : false}
                    // inputProps={{ style: inputStyle }}
                    InputProps={{
                      // ...params.InputProps,
                      // style: { inputStyle },
                      classes: {
                        root: classes.inputRootAutocompleteCardNumber,
                        underline: classes.noBorder,
                        input: classes.input,
                      },
                      // disableUnderline: true,
                    }}
                  />
                )}
              </CustomMaskInput> */}

              <Cleave
                delimiter="-"
                options={{
                  creditCard: true,
                  onCreditCardTypeChanged: handleType,
                }}
                name="paymentInfo.cardNumber"
                error={errors.paymentInfo?.cardNumber ? true : false}
                onChange={handleNum}
                placeholder="Card number"
                className="credit-card-input-by-bookinglane"
              />

              {cardForPaymentSubmitError && (
                <p className={classes.error}>Required</p>
              )}
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-between"
                spacing={2}
              >
                <Grid item xs={6}>
                  <CustomMaskInput
                    name="paymentInfo.month"
                    mask="99/99"
                    autoComplete="off"
                    defaultValue={`${formSummary.paymentInfo.month}/${formSummary.paymentInfo.year}`}
                  >
                    {() => (
                      <TextField
                        variant="standard"
                        className={classes.inputPlaceholderFontSize}
                        placeholder="mm/yy"
                        autoComplete="off"
                        fullWidth
                        error={errors.paymentInfo?.month ? true : false}
                        style={{ background: "transparent" }}
                        // inputProps={{ style: inputStyle }}
                        InputProps={{
                          // ...params.InputProps,
                          classes: {
                            root: classes.inputRootAutocompleteCardNumber,
                            underline: classes.noBorder,
                            input: classes.input,
                          },
                          // disableUnderline: true,
                        }}
                      />
                    )}
                  </CustomMaskInput>
                  {errors.paymentInfo?.month && (
                    <p className={classes.error}>
                      {errors.paymentInfo?.month.message}
                    </p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <CustomMaskInput
                    name="paymentInfo.cvc"
                    type="date"
                    mask={cardType == "amex" ? "9999" : "999"}
                    autoComplete="off"
                    defaultValue={formSummary.paymentInfo.cvc}
                  >
                    {() => (
                      <TextField
                        variant="standard"
                        className={classes.inputPlaceholderFontSize}
                        placeholder="CVV/CVC"
                        autoComplete="off"
                        fullWidth
                        error={errors.paymentInfo?.cvc ? true : false}
                        style={{ background: "transparent" }}
                        // inputProps={{ style: inputStyle }}
                        InputProps={{
                          // ...params.InputProps,
                          classes: {
                            root: classes.inputRootAutocompleteCardNumber,
                            underline: classes.noBorder,
                            input: classes.input,
                          },
                          // disableUnderline: true,
                        }}
                      />
                    )}
                  </CustomMaskInput>
                  {errors.paymentInfo?.cvc && (
                    <p className={classes.error}>
                      {errors.paymentInfo?.cvc.message}
                    </p>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Checkbox
                style={{ color: "#9e9e9e" }}
                onClick={() => setChecked(!checked)}
                className={classes.checkboxMain}
                InputProps={{
                  classes: {
                    root: classes.checkbox,
                  },
                }}
              />
              <Link underline="always" style={{ color: "#BABABA" }}>
                <TermsOfUse />
              </Link>
              <Link underline="always" style={{ color: "#BABABA" }}>
                <PrivacyPolicy />
              </Link>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
                spacing={1}
                className={classes.buttonGroup}
              >
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={back}
                    startIcon={<BackArrowIcon />}
                    className={classes.backButtonSelf}
                    style={{
                      height: "50px",

                      textTransform: "none",
                    }}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    color="primary"
                    className={classes.payButtonSelf}
                    style={{
                      height: "50px",

                      textTransform: "none",
                    }}
                    disabled={!checked}
                  >
                    Pay ${total}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default PaymentUIComponent
