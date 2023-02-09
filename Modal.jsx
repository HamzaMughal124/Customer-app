import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import "./Modal.css";
import Grid from "@mui/material/Grid";
import { Typography, IconButton, Skeleton } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Box } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ apps, open, setOpen, loading }) {
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="modal_header">
          <Typography className="title">Application</Typography>
          <IconButton onClick={handleClose}>
            <CancelOutlinedIcon className="cancle_icon" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {apps.length === 0 ? (
            <Box>
              {loading ? (
                <Grid container>
                  <Grid item xs={5}>
                    <Skeleton variant="rounded" width={190} height={110} />
                  </Grid>
                  <Grid item xs={7}>
                    <Skeleton variant="text" width="70%" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                  </Grid>
                </Grid>
              ) : (
                <Typography className="no_apps">No apps found</Typography>
              )}
            </Box>
          ) : (
            apps.map((app) => {
              return (
                <React.Fragment key={app._id}>
                  {loading ? (
                    <Grid container>
                      <Grid item xs={5}>
                        <Skeleton variant="rounded" width={190} height={110} />
                      </Grid>
                      <Grid item xs={7}>
                        <Skeleton variant="text" width="70%" />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container className="app_list">
                      <Grid item xs={5} className="thumb_img">
                        <img src={app?.app_thumb} alt="thumb-img" />
                      </Grid>
                      <Grid item xs={7} className="app_info">
                        <Typography className="app_name">
                          {app ? app.app_name : "no apps found"}
                        </Typography>
                        <Grid container rowGap={1.5}>
                          <Grid item xs={6}>
                            <Typography className="info_heading">
                              Created at:
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="info_heading"
                              style={{ color: "#000000" }}
                            >
                              {app.created_at}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className="info_heading">
                              Industry:
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="info_heading"
                              style={{ color: "#000000" }}
                            >
                              {app.industry}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography className="info_heading">
                              Status:
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className="info_heading"
                              style={{ color: "#1BC000" }}
                            >
                              {app.app_status}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </React.Fragment>
              );
            })
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
