import React, { useState } from "react";
import {
  Paper, 
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
 import classnames from "classnames";

// styles
import useStyles from "./styles";

export default function Widget({
  children,
  title,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  noHeaderPadding,
  headerClass,
  style,
  noWidgetShadow,
  ...props
}) {
  var classes = useStyles();

  // local
  var [moreButtonRef] = useState(null);
  var [isMoreMenuOpen, setMoreMenuOpen] = useState(false);

  return (
    <div className={classes.widgetWrapper} style={style && {...style}}>
      <Paper className={classes.paper} classes={{ root: classnames(classes.widgetRoot, {
        [classes.noWidgetShadow]: noWidgetShadow
        }) }}>
        <div className={classnames(classes.widgetHeader, {
          [classes.noPadding]: noHeaderPadding,
          [headerClass]: headerClass
        })}>
          {header ? (
            header
          ) : (
            <React.Fragment>
              <Typography variant="h6" color="textSecondary" noWrap>
                {title}
              </Typography>
              { /** !disableWidgetMenu && (
                <IconButton
                  color="primary"
                  classes={{ root: classes.moreButton }}
                  aria-owns="widget-menu"
                  aria-haspopup="true"
                  onClick={() => setMoreMenuOpen(true)}
                  buttonRef={setMoreButtonRef}
                >
                  <MoreIcon />
                </IconButton>
              ) */ }
            </React.Fragment>
          )}
        </div>
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass]: bodyClass,
          })}
        >
          {children}
        </div>
      </Paper>
      <Menu
        id="widget-menu"
        open={isMoreMenuOpen}
        anchorEl={moreButtonRef}
        onClose={() => setMoreMenuOpen(false)}
        disableAutoFocusItem
      >
        
        <MenuItem>
          <Typography> </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
