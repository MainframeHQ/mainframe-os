import COLORS from './colors'

const MARGINS = {
  marginLeft10: {
    margin: '0 0 0 10px',
  },
  marginLeft20: {
    margin: '0 0 0 20px',
  },
  marginRight10: {
    margin: '0 10px 0 0',
  },
  marginRight20: {
    margin: '0 20px 0 0',
  },
  marginTop10: {
    margin: '10px 0 0 0',
  },
  marginTop20: {
    margin: '20px 0 0 0',
  },
  marginBottom10: {
    margin: '0 0 10px 0',
  },
  marginBottom20: {
    margin: '0 0 20px 0',
  },
  marginVertical10: {
    margin: '10px 0',
  },
  marginVertical20: {
    margin: '20px 0',
  },
  marginHorizontal10: {
    margin: '0 10px',
  },
  marginHorizontal20: {
    margin: '0 20px',
  },
}

export default {
  Button: {
    default: {
      backgroundColor: 'transparent',
      backgroundHoverColor: 'transparent',
      backgroundDisabledColor: 'transparent',
      iconBackgroundColor: 'transparent',
      iconHoverBackgroundColor: 'transparent',
      iconHoverColor: COLORS.PRIMARY_RED,
    },
    onboarding: {
      padding: 0,
      titleColor: COLORS.PRIMARY_RED,
      titleHoverColor: COLORS.PRIMARY_DARK_RED,
      iconColor: COLORS.PRIMARY_RED,
      iconHoverColor: COLORS.PRIMARY_DARK_RED,
      borderWidth: 0,
      iconPadding: 0,
    },
    leftNav: {
      iconPosition: 'top',
      titleColor: COLORS.GREY_DARK_80,
      iconColor: COLORS.GREY_DARK_80,
      titleHoverColor: COLORS.PRIMARY_BLUE,
      iconHoverColor: COLORS.PRIMARY_BLUE,
      borderWidth: 0,
      padding: 0,
      fontWeight: 'normal',
      fontSize: 13,
      iconPadding: '5px',
      iconMargin: 0,
      titlePadding: 0,
    },
    leftNavActive: {
      fontWeight: 'bold',
      titleColor: COLORS.PRIMARY_BLUE,
      iconColor: COLORS.PRIMARY_BLUE,
      titleHoverColor: COLORS.PRIMARY_BLUE,
      iconHoverColor: COLORS.PRIMARY_BLUE,
    },
    completeOnboarding: {
      fontWeight: 'normal',
      borderHoverColor: 'transparent',
      hoverShadow: true,
    },
    walletOnboarding: {
      iconHoverBackgroundColor: COLORS.PRIMARY_RED,
      iconHoverColor: COLORS.WHITE,
      iconWidth: 18,
      iconHeight: 18,
      iconPadding: '8px',
      titlePadding: '8px',
    },
    small: {
      titlePadding: '5px 10px',
      fontSize: 9,
    },
    medium: {
      iconWidth: 14,
      iconHeight: 14,
      fontSize: 12,
      borderRadius: 3,
      iconPadding: '7px 5px',
      titlePadding: '3px 5px',
    },
    xSmall: {
      iconWidth: 10,
      iconHeight: 10,
      fontSize: 9,
      borderRadius: 3,
      iconPadding: '3px 5px',
      titlePadding: '3px 5px',
    },
    xSmallIconOnly: {
      iconWidth: 14,
      iconHeight: 14,
      iconPadding: '5px',
      fontSize: 9,
      borderRadius: 3,
    },
    red: {
      borderWidth: 0,
      backgroundColor: COLORS.PRIMARY_RED,
      backgroundHoverColor: COLORS.PRIMARY_DARK_RED,
      titleColor: COLORS.WHITE,
      titleHoverColor: COLORS.WHITE,
    },
    modalButton: {
      titlePadding: '10px 30px',
      fontSize: 12,
    },
    grey: {
      titleColor: COLORS.GREY_A9,
    },
    noTitle: {
      titlePadding: '0',
    },
    seedWord: {
      titlePadding: '5px 8px',
    },
    selectedSeedWord: {
      titlePadding: '5px 8px',
      borderColor: '#A9A9A9',
      borderHoverColor: '#A9A9A9',
      backgroundColor: '#A9A9A9',
      backgroundHoverColor: '#A9A9A9',
      titleHoverColor: COLORS.WHITE,
      titleColor: COLORS.WHITE,
    },
    full: {
      minWidth: '100%',
    },
    ...MARGINS,
  },
  Text: {
    default: {
      fontWeight: '300',
    },
    mono: {
      fontFamily: 'IBM Plex Mono',
    },
    regular: {
      fontWeight: '400',
    },
    error: {
      paddingBottom: 10,
      color: COLORS.PRIMARY_RED,
    },
    smallTitle: {
      textTransform: 'uppercase',
      color: COLORS.GREY_A9,
      fontSize: 10,
      letterSpacing: '1.5px',
      padding: '20px 0',
    },
    appButtonName: {
      fontSize: '12px',
      color: '#303030',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    appButtonId: {
      fontSize: '10px',
      color: '#808080',
      textAlign: 'center',
      width: '72px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    grey: {
      color: COLORS.GREY_A9,
    },
    greyMed: {
      color: COLORS.GREY_MED_58,
    },
    greyDark: {
      color: COLORS.GREY_DARK_30,
    },
    greyDark23: {
      color: COLORS.GREY_DARK_23,
    },
    blue: {
      color: COLORS.DARK_BLUE,
    },
    red: {
      color: COLORS.PRIMARY_RED,
    },
    noPadding: {
      padding: 0,
    },
    small: {
      fontSize: 11,
    },
    ellipsis: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    addressLarge: {
      backgroundColor: '#F9F9F9',
      padding: '30px 20px',
      textAlign: 'center',
      color: '#303030',
      fontSize: 13,
    },
    center: {
      textAlign: 'center',
    },
    modalText: {
      fontSize: 12,
      color: '#585858',
    },
    padding10: {
      padding: '10px',
    },
    redButton: {
      borderRadius: '3px',
      padding: '5px',
      backgroundColor: COLORS.PRIMARY_RED,
      fontWeight: 'bold',
    },
    flex1: {
      flex: 1,
    },
    ...MARGINS,
  },
  TextField: {
    search: {
      padding: '5px',
      fontSize: 13,
      iconWidth: 14,
      iconHeight: 14,
    },
  },
  Checkbox: {
    mono: {
      fontFamily: 'IBM Plex Mono',
    },
  },
  DropDown: {
    default: {
      padding: '5px 10px',
      menuItemPadding: '5px 10px',
    },
  },
  styled: {
    colors: COLORS,
    spacing: 10,
  },
}
