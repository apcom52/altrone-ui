type translationOptions = {
    defaultValue?: string;
    value?: number;
    plural?: boolean;
    vars?: Record<string, any>;
};
export declare const useLocalization: () => (t: string, config?: translationOptions) => string;
export {};
