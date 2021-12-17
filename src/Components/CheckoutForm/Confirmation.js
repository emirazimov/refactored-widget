import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Preloader } from "./../Helpers/Preloader"
import Grid from "@material-ui/core/Grid"
import { Success } from "../../assets/icons"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import ReservationFailed from "./ReservationFailed"
import {
  createReservation,
  logOut,
  setIsAirportPickupIncluded,
} from "./../../Redux/form-reducer"
import { setResetWidgetInputs } from "../../Redux/reset-widget-inputs-reducer"
import { setGotAddressError } from "../../Redux/company-profile-reducer"

// setResetWidgetInputs,
// setGotAddressError,
// setIsAirportPickupIncluded

const Confirmation = ({
  createReservation,
  companyName,
  email,
  setExpanded,
  isSuccess,
  isFetching,
  setActiveStep,
  formSummary,
  logOut,
  failMessage,
  setBackgroundScrollStop,
  setResetWidgetInputs,
  setGotAddressError,
  setIsAirportPickupIncluded,
}) => {
  useEffect(() => {
    createReservation(formSummary)
  }, [])
  const textColor = "white"

  return (
    <>
      {isFetching ? (
        <Preloader />
      ) : isSuccess ? (
        <Grid
          container
          direction="column"
          spacing={2}
          justify="center"
          alignItems="center"
          style={{ height: "80vh", backgroundColor: "black" }}
        >
          <Grid item>
            <Success />
          </Grid>
          {/* <Grid item>
                            <Typography variant='body2'>Success</Typography>
                        </Grid> */}
          <Grid item>
            <Typography
              variant="body2"
              style={{ color: textColor }}
              align="center"
            >
              Your reservation was successfully{" "}
              <Typography variant="body2" style={{ color: textColor }}>
                submitted. A confirmation email was
              </Typography>{" "}
              sent to {email && email}.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" style={{ color: textColor }}>
              Thanks, {companyName && companyName}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                setExpanded(false)
                setActiveStep(0)

                setBackgroundScrollStop(false)
                setResetWidgetInputs(true)
                setGotAddressError(false)
                setIsAirportPickupIncluded(false)
                // logOut()
              }}
              variant="contained"
              color="primary"
              fullWidth
            >
              Done
            </Button>
          </Grid>
        </Grid>
      ) : (
        <ReservationFailed
          setActiveStep={setActiveStep}
          // failMessage={failMessage}
        />
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isSuccess: state.companyProfile.isSuccess,
    failMessage: state.companyProfile.failMessage,
    isFetching: state.cars.isFetching,
    formSummary: state.formData,
    email: state.formData.client.email,
    companyName: state.companyProfile.profile.companyName,
  }
}

export default connect(mapStateToProps, {
  createReservation,
  logOut,
  setResetWidgetInputs,
  setGotAddressError,
  setIsAirportPickupIncluded,
})(Confirmation)
