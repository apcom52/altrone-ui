interface SizeResult extends Record<string, number | boolean | any> {
    width: number;
    height: number;
    DesktopXL: boolean;
    DesktopL: boolean;
    DesktopM: boolean;
    DesktopS: boolean;
    DesktopXS: boolean;
    TabletL: boolean;
    TabletM: boolean;
    TabletS: boolean;
    PhoneL: boolean;
    PhoneM: boolean;
    PhoneS: boolean;
    gtDesktopXL: boolean;
    gtDesktopL: boolean;
    gtDesktopM: boolean;
    gtDesktopS: boolean;
    gtDesktopXS: boolean;
    gtTabletL: boolean;
    gtTabletM: boolean;
    gtTabletS: boolean;
    gtPhoneL: boolean;
    gtPhoneM: boolean;
    gtPhoneS: boolean;
    ltDesktopXL: boolean;
    ltDesktopL: boolean;
    ltDesktopM: boolean;
    ltDesktopS: boolean;
    ltDesktopXS: boolean;
    ltTabletL: boolean;
    ltTabletM: boolean;
    ltTabletS: boolean;
    ltPhoneL: boolean;
    ltPhoneM: boolean;
    ltPhoneS: boolean;
    gteDesktopXL: boolean;
    gteDesktopL: boolean;
    gteDesktopM: boolean;
    gteDesktopS: boolean;
    gteDesktopXS: boolean;
    gteTabletL: boolean;
    gteTabletM: boolean;
    gteTabletS: boolean;
    gtePhoneL: boolean;
    gtePhoneM: boolean;
    gtePhoneS: boolean;
    lteDesktopXL: boolean;
    lteDesktopL: boolean;
    lteDesktopM: boolean;
    lteDesktopS: boolean;
    lteDesktopXS: boolean;
    lteTabletL: boolean;
    lteTabletM: boolean;
    lteTabletS: boolean;
    ltePhoneL: boolean;
    ltePhoneM: boolean;
    ltePhoneS: boolean;
    between: (from: string, to: string) => boolean;
}
export declare const useWindowSize: () => Partial<SizeResult>;
export {};