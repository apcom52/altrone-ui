import {createContext, useContext} from "react";
import {ThemeConfig} from "../types";
import {DEFAULT_THEME} from "../constants";

export const ThemeContext = createContext<ThemeConfig>(DEFAULT_THEME)
export const useThemeContext = () => useContext(ThemeContext)