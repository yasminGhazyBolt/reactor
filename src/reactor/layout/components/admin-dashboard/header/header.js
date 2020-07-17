import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { refresh, switchLang } from 'reactor/router';
import { trans } from 'reactor/localization';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from 'reactor/components/tooltip';
// import ExitToApp from '@material-ui/icons/ExitToApp';
import RefreshIcon from '@material-ui/icons/Refresh';
import Link from 'reactor/components/link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import layoutClasses from 'reactor/layout/utils/style';
import { makeStyles, styled } from '@material-ui/core';
// import userLogout from 'modules/users/helpers/user-logout';
import SelectInput from 'reactor/form/components/select-input';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import styleSettings from 'reactor/layout/utils/style-settings';
import { localeCodes, getCurrentLocaleCode } from 'reactor/localization/locales';

const userLogout = () => {};

const localeCodesList = localeCodes.map(localeCode => {
    return {
        label: trans(localeCode),
        value: localeCode,
    };
});

const useStyles = makeStyles({
    whiteColor: {
        color: '#FFF',
    },
    toolbarColor: {
        color: styleSettings.get('dashboard.header.color'),
    }
});

const HeaderLink = styled(Link)({
    color: styleSettings.get('dashboard.header.linkColor', 'inherit'),
    textDecoration: 'none'
})

const Dropdown = props => {
    const classes = useStyles();
    return <SelectInput {...props} disableUnderline classes={{ root: classes.whiteColor, icon: classes.whiteColor }} />
}

export default function Header(props) {
    let classes = layoutClasses(),
        sidebarIsOpened = props.sidebarIsOpened;

    const headerClasses = useStyles();

    return (
        <AppBar
            position="absolute"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: sidebarIsOpened,
            })}
        >
            <Toolbar classes={{ root: headerClasses.toolbarColor }}>
                {/* Sidebar Toggle Icon */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.onClick}
                    edge="start"
                    className={clsx(classes.menuButton, sidebarIsOpened && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                {/* Application Name */}
                <Typography variant="h6" noWrap>
                    <HeaderLink to={'/'}>{trans('appName')}</HeaderLink>
                </Typography>
                {/* Divider */}
                <div className={classes.grow} />

                {/* Refresh Button */}

                <IconButton color="inherit" onClick={refresh}>
                    <Tooltip title={trans('refresh')}>
                        <RefreshIcon />
                    </Tooltip>
                </IconButton>

                {/* Switch Button */}

                <IconButton>
                    <Dropdown value={getCurrentLocaleCode()} items={localeCodesList} onChange={item => switchLang(item.value)} />
                </IconButton>

                {/* Logout Button */}
                <IconButton color="inherit" onClick={userLogout}>
                    <Tooltip title={trans('logout')}>
                        <LogoutIcon />
                    </Tooltip>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
};

Header.propTypes = {
    onClick: PropTypes.func.isRequired,
    classes: PropTypes.object,
    sidebarIsOpened: PropTypes.bool,
}